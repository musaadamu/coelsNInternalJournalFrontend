import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Navigation from '../components/Navigation.jsx';

const ManageJournal = () => {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedJournals, setSelectedJournals] = useState([]);
    const [bulkAction, setBulkAction] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredJournals, setFilteredJournals] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

    useEffect(() => {
        fetchJournals();
    }, []);

    useEffect(() => {
        // Filter and sort journals whenever journals, searchTerm, or sortConfig changes
        let result = [...journals];
        
        // Apply search filter
        if (searchTerm) {
            result = result.filter(journal => 
                journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                journal.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (journal.authors && journal.authors.some(author => 
                    author.toLowerCase().includes(searchTerm.toLowerCase())
                ))
            );
        }
        
        // Apply sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        
        setFilteredJournals(result);
    }, [journals, searchTerm, sortConfig]);

    const fetchJournals = async () => {
        setLoading(true);
        try {
            const response = await api.journals.getAll();
            setJournals(response.data);
        } catch (err) {
            console.error('Error fetching journals:', err);
            setError('Failed to load journals. Please try again later.');
            toast.error('Failed to load journals');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSelectJournal = (id) => {
        if (selectedJournals.includes(id)) {
            setSelectedJournals(selectedJournals.filter(journalId => journalId !== id));
        } else {
            setSelectedJournals([...selectedJournals, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedJournals.length === filteredJournals.length) {
            setSelectedJournals([]);
        } else {
            setSelectedJournals(filteredJournals.map(journal => journal._id));
        }
    };

    const handleBulkAction = async () => {
        if (!bulkAction || selectedJournals.length === 0) {
            toast.warning('Please select journals and an action');
            return;
        }

        try {
            if (bulkAction === 'delete') {
                if (window.confirm(`Are you sure you want to delete ${selectedJournals.length} journals?`)) {
                    await Promise.all(selectedJournals.map(id => api.journals.delete(id)));
                    toast.success(`${selectedJournals.length} journals deleted successfully`);
                    fetchJournals();
                    setSelectedJournals([]);
                }
            } else if (bulkAction === 'publish') {
                await Promise.all(selectedJournals.map(id => api.journals.updateStatus(id, 'Published')));
                toast.success(`${selectedJournals.length} journals published successfully`);
                fetchJournals();
                setSelectedJournals([]);
            } else if (bulkAction === 'unpublish') {
                await Promise.all(selectedJournals.map(id => api.journals.updateStatus(id, 'Draft')));
                toast.success(`${selectedJournals.length} journals unpublished successfully`);
                fetchJournals();
                setSelectedJournals([]);
            }
        } catch (err) {
            console.error('Error performing bulk action:', err);
            toast.error('Failed to perform action on selected journals');
        }
    };

    const handleDeleteJournal = async (id) => {
        if (window.confirm('Are you sure you want to delete this journal?')) {
            try {
                await api.journals.delete(id);
                toast.success('Journal deleted successfully');
                fetchJournals();
            } catch (err) {
                console.error('Error deleting journal:', err);
                toast.error('Failed to delete journal');
            }
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.journals.updateStatus(id, status);
            toast.success(`Journal ${status === 'Published' ? 'published' : 'unpublished'} successfully`);
            fetchJournals();
        } catch (err) {
            console.error('Error updating journal status:', err);
            toast.error('Failed to update journal status');
        }
    };

    if (loading) return <div className="text-center py-10">Loading journals...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Journals</h1>
                
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p>{error}</p>
                    </div>
                )}
                
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                            <select 
                                value={bulkAction} 
                                onChange={(e) => setBulkAction(e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Bulk Actions</option>
                                <option value="publish">Publish</option>
                                <option value="unpublish">Unpublish</option>
                                <option value="delete">Delete</option>
                            </select>
                            <button 
                                onClick={handleBulkAction}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Apply
                            </button>
                        </div>
                        <div className="w-full sm:w-auto">
                            <input 
                                type="text" 
                                placeholder="Search journals..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedJournals.length === filteredJournals.length && filteredJournals.length > 0}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('title')}
                                    >
                                        Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Authors
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('status')}
                                    >
                                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('createdAt')}
                                    >
                                        Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredJournals.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No journals found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredJournals.map(journal => (
                                        <tr key={journal._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedJournals.includes(journal._id)}
                                                    onChange={() => handleSelectJournal(journal._id)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{journal.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {journal.authors ? journal.authors.join(', ') : 'Unknown'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    journal.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {journal.status || 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(journal.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => navigate(`/journals/${journal._id}`)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/journals/edit/${journal._id}`)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    Edit
                                                </button>
                                                {journal.status !== 'Published' ? (
                                                    <button
                                                        onClick={() => handleUpdateStatus(journal._id, 'Published')}
                                                        className="text-green-600 hover:text-green-900 mr-3"
                                                    >
                                                        Publish
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleUpdateStatus(journal._id, 'Draft')}
                                                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                                                    >
                                                        Unpublish
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteJournal(journal._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageJournal;
