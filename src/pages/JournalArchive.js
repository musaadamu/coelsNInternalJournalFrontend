import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiCalendar, FiBook, FiUser, FiDownload } from 'react-icons/fi';
import './JournalArchive.css';

const JournalArchive = () => {
    const [journals, setJournals] = useState([]);
    const [filteredJournals, setFilteredJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        year: 'all',
        category: 'all',
    });
    const [showFilters, setShowFilters] = useState(false);

    // Years for filter dropdown
    const years = ['all', '2023', '2022', '2021', '2020', '2019'];
    
    // Categories for filter dropdown
    const categories = [
        'all',
        'Education',
        'Teaching Methods',
        'Curriculum Development',
        'Educational Technology',
        'Teacher Training',
        'Educational Psychology',
        'Special Education',
        'Educational Leadership'
    ];

    // Fetch journals from API
    useEffect(() => {
        const fetchJournals = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await fetch('https://saharabackend-v190.onrender.com/api/journals');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch journals');
                }
                
                const data = await response.json();
                setJournals(data);
                setFilteredJournals(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                
                // Fallback to sample data if API fails
                const sampleData = generateSampleData();
                setJournals(sampleData);
                setFilteredJournals(sampleData);
            }
        };

        fetchJournals();
    }, []);

    // Generate sample data for fallback
    const generateSampleData = () => {
        return [
            {
                _id: '1',
                title: 'Innovative Teaching Methods in STEM Education',
                authors: ['Sarah Johnson', 'Michael Chen'],
                abstract: 'This study explores innovative teaching methods in STEM education and their impact on student engagement and learning outcomes.',
                publicationDate: '2023-03-15',
                category: 'Teaching Methods',
                volume: 'Vol. 12',
                issue: 'Issue 2',
                pages: '45-62',
                downloadUrl: '/sample-journals/stem-education.pdf',
                thumbnailUrl: '/images/journal-covers/stem-cover.jpg'
            },
            {
                _id: '2',
                title: 'The Impact of Technology Integration in Primary Education',
                authors: ['David Williams', 'Emily Rodriguez'],
                abstract: 'An examination of how technology integration in primary education classrooms affects student learning and teacher effectiveness.',
                publicationDate: '2022-11-10',
                category: 'Educational Technology',
                volume: 'Vol. 11',
                issue: 'Issue 4',
                pages: '78-95',
                downloadUrl: '/sample-journals/tech-integration.pdf',
                thumbnailUrl: '/images/journal-covers/tech-cover.jpg'
            },
            {
                _id: '3',
                title: 'Teacher Professional Development in Rural Schools',
                authors: ['Robert Brown', 'Lisa Thompson'],
                abstract: 'This research investigates effective professional development strategies for teachers in rural school settings.',
                publicationDate: '2022-07-22',
                category: 'Teacher Training',
                volume: 'Vol. 11',
                issue: 'Issue 3',
                pages: '112-130',
                downloadUrl: '/sample-journals/rural-pd.pdf',
                thumbnailUrl: '/images/journal-covers/rural-cover.jpg'
            },
            {
                _id: '4',
                title: 'Inclusive Education Practices for Students with Learning Disabilities',
                authors: ['Jennifer Martinez', 'Thomas Wilson'],
                abstract: 'A comprehensive review of inclusive education practices that support students with learning disabilities in mainstream classrooms.',
                publicationDate: '2021-09-05',
                category: 'Special Education',
                volume: 'Vol. 10',
                issue: 'Issue 3',
                pages: '55-72',
                downloadUrl: '/sample-journals/inclusive-ed.pdf',
                thumbnailUrl: '/images/journal-covers/inclusive-cover.jpg'
            },
            {
                _id: '5',
                title: 'Curriculum Development for 21st Century Skills',
                authors: ['Amanda Lee', 'James Taylor'],
                abstract: 'This paper presents a framework for developing curriculum that effectively integrates 21st century skills across subject areas.',
                publicationDate: '2021-04-18',
                category: 'Curriculum Development',
                volume: 'Vol. 10',
                issue: 'Issue 1',
                pages: '28-46',
                downloadUrl: '/sample-journals/21st-century.pdf',
                thumbnailUrl: '/images/journal-covers/curriculum-cover.jpg'
            },
            {
                _id: '6',
                title: 'Educational Leadership in Diverse School Communities',
                authors: ['Carlos Mendez', 'Sophia Kim'],
                abstract: 'An analysis of effective leadership strategies in schools with diverse student populations and community contexts.',
                publicationDate: '2020-12-03',
                category: 'Educational Leadership',
                volume: 'Vol. 9',
                issue: 'Issue 4',
                pages: '89-107',
                downloadUrl: '/sample-journals/diverse-leadership.pdf',
                thumbnailUrl: '/images/journal-covers/leadership-cover.jpg'
            }
        ];
    };

    // Filter journals based on search term and filters
    useEffect(() => {
        let results = journals;
        
        // Apply search term filter
        if (searchTerm) {
            results = results.filter(journal => 
                journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                journal.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                journal.authors.some(author => 
                    author.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        
        // Apply year filter
        if (filters.year !== 'all') {
            results = results.filter(journal => {
                const journalYear = new Date(journal.publicationDate).getFullYear().toString();
                return journalYear === filters.year;
            });
        }
        
        // Apply category filter
        if (filters.category !== 'all') {
            results = results.filter(journal => 
                journal.category === filters.category
            );
        }
        
        setFilteredJournals(results);
    }, [searchTerm, filters, journals]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Toggle filters visibility
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="journal-archive-container">
            <div className="archive-header">
                <h1>Journal Archive</h1>
                <p>Browse our collection of peer-reviewed research publications in teacher education and related fields.</p>
            </div>

            <div className="search-filter-container">
                <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by title, author, or keywords..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                
                <button className="filter-toggle" onClick={toggleFilters}>
                    <FiFilter />
                    <span>Filters</span>
                </button>
            </div>

            {showFilters && (
                <div className="filters-panel">
                    <div className="filter-group">
                        <label htmlFor="year">
                            <FiCalendar className="filter-icon" />
                            Publication Year
                        </label>
                        <select
                            id="year"
                            name="year"
                            value={filters.year}
                            onChange={handleFilterChange}
                        >
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year === 'all' ? 'All Years' : year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="category">
                            <FiBook className="filter-icon" />
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading journals...</p>
                </div>
            ) : error && journals.length === 0 ? (
                <div className="error-container">
                    <p>Error: {error}</p>
                    <p>Please try again later or contact support.</p>
                </div>
            ) : (
                <>
                    <div className="results-info">
                        <p>Showing {filteredJournals.length} of {journals.length} journals</p>
                    </div>

                    <div className="journals-grid">
                        {filteredJournals.length > 0 ? (
                            filteredJournals.map(journal => (
                                <div key={journal._id} className="journal-card">
                                    <div className="journal-card-content">
                                        <h3 className="journal-title">
                                            <Link to={`/journals/${journal._id}`}>
                                                {journal.title}
                                            </Link>
                                        </h3>
                                        
                                        <div className="journal-authors">
                                            <FiUser className="card-icon" />
                                            <p>{journal.authors.join(', ')}</p>
                                        </div>
                                        
                                        <div className="journal-meta">
                                            <span className="journal-date">
                                                <FiCalendar className="card-icon" />
                                                {formatDate(journal.publicationDate)}
                                            </span>
                                            <span className="journal-category">
                                                {journal.category}
                                            </span>
                                        </div>
                                        
                                        <p className="journal-abstract">{journal.abstract}</p>
                                        
                                        <div className="journal-details">
                                            <span>{journal.volume}</span>
                                            <span>{journal.issue}</span>
                                            <span>Pages: {journal.pages}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="journal-actions">
                                        <Link to={`/journals/${journal._id}`} className="view-button">
                                            View Details
                                        </Link>
                                        <a href={journal.downloadUrl} className="download-button">
                                            <FiDownload className="download-icon" />
                                            Download PDF
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No journals match your search criteria.</p>
                                <button 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilters({ year: 'all', category: 'all' });
                                    }}
                                    className="reset-button"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default JournalArchive;
