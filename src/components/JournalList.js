
// export default JournalList;
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './JournalList.css';

// Import the API service and utilities
import api from '../services/api';
import { downloadJournalFile } from '../utils/fileDownload';

const JournalList = () => {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJournals: 0,
        limit: 6 // Fixed page size - 6 journals per page
    });

    // Define fetchJournals with useCallback to avoid dependency issues
    const fetchJournals = useCallback(async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            console.log('Fetching journals using API service');
            const response = await api.journals.getAll({
                page,
                limit: 6, // Fixed limit of 6 journals per page
                sortBy: 'createdAt',
                order: 'desc'
            });

            console.log('API Response:', response.data);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            // Handle both array response and paginated response formats
            const journalsData = Array.isArray(response.data) ?
                response.data :
                response.data.journals || [];

            // Ensure we have valid pagination data with fallbacks for each property
            const paginationData = {
                currentPage: Number(response.data.pagination?.currentPage || page || 1),
                totalPages: Number(response.data.pagination?.totalPages || Math.ceil(journalsData.length / 6) || 1),
                totalJournals: Number(response.data.pagination?.totalJournals || journalsData.length || 0),
                limit: 6 // Fixed limit
            };

            console.log('Pagination data:', paginationData);

            setJournals(journalsData);
            setPagination(paginationData);
        } catch (err) {
            console.error('Fetch journals error:', err);
            let errorMsg = 'Failed to fetch journals';

            if (err.response) {
                errorMsg = err.response.data?.message ||
                         (err.response.status === 401 ? 'Unable to fetch all journals. Some features may require login.' :
                         err.response.status === 404 ? 'Journal endpoint not found' :
                         'Server error occurred');

                // Don't redirect to login for unauthorized errors
                // This allows public access to the home page
            } else if (err.request) {
                errorMsg = 'Network error - unable to reach server';
            } else {
                errorMsg = err.message || 'Error fetching journals';
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchJournals();
    }, [fetchJournals]);

    const handleDownload = async (id, fileType) => {
        console.log(`Downloading ${fileType} file for journal ID:`, id);
        try {
            // Show loading toast
            const toastId = toast.loading(`Preparing ${fileType.toUpperCase()} download...`);

            // Find the journal in our list
            const journal = journals.find(j => j._id === id);

            // Determine if we're in production or development
            const isProduction = process.env.NODE_ENV === 'production';

            // Get the backend URL
            const backendUrl = isProduction
                ? 'https://coelsn-backend.onrender.com'
                : 'http://localhost:5000';

            console.log('Environment:', { isProduction, NODE_ENV: process.env.NODE_ENV });
            console.log('Using backend URL:', backendUrl);
            console.log('API base URL:', api.defaults.baseURL);

            // Diagnostic: Check if file exists before download
            // Skip this check in local development to avoid affecting local downloads
            if (process.env.NODE_ENV === 'production') {
                const checkFileUrl = `${api.defaults.baseURL}/check-file/${id}/${fileType}`;
                try {
                    const checkResponse = await fetch(checkFileUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                        },
                        credentials: 'omit',
                        mode: 'cors',
                        cache: 'no-cache'
                    });
                    if (!checkResponse.ok) {
                        throw new Error(`File existence check failed with status ${checkResponse.status}`);
                    }
                    const checkData = await checkResponse.json();
                    console.log('File existence check response:', checkData);

                    // If the file exists (either on Cloudinary or local storage), proceed with download
                    if (checkData.exists) {
                        console.log(`${fileType.toUpperCase()} file exists:`, checkData.message || 'File found');

                        // If we have a Cloudinary URL, we can use it directly
                        if (checkData.cloudinaryUrl) {
                            console.log('Using Cloudinary URL for download:', checkData.cloudinaryUrl);

                            // For PDF files, try multiple download approaches
                            if (fileType === 'pdf') {
                                // Use the direct download endpoint
                                try {
                                    console.log('Using direct download endpoint for PDF');
                                    // Make sure we're using the correct base URL
                                    const baseUrl = api.defaults.baseURL || 'https://coelsn-backend.onrender.com/api';

                                    // Create the direct download URL
                                    const downloadUrl = `${baseUrl}/journals/${id}/direct-download/pdf`;

                                    console.log('Direct download URL:', downloadUrl);

                                    // Open the URL in a new tab
                                    window.open(downloadUrl, '_blank');
                                    toast.dismiss(toastId);
                                    toast.success(`Opening ${fileType.toUpperCase()} file in new tab`);
                                    return;
                                } catch (directDownloadError) {
                                    console.error('Direct download failed:', directDownloadError);
                                    // Continue with other methods
                                }

                                // Then try the Cloudinary download URL format
                                if (checkData.downloadUrl2) {
                                    console.log('Using Cloudinary download URL format:', checkData.downloadUrl2);

                                    // Open in a new tab to trigger download
                                    window.open(checkData.downloadUrl2, '_blank');
                                    toast.dismiss(toastId);
                                    toast.success(`Opening ${fileType.toUpperCase()} file in new tab`);
                                    return;
                                }

                                // Then try the fl_attachment URL
                                if (checkData.downloadUrl) {
                                    console.log('Using Cloudinary fl_attachment URL:', checkData.downloadUrl);

                                    // Open in a new tab to trigger download
                                    window.open(checkData.downloadUrl, '_blank');
                                    toast.dismiss(toastId);
                                    toast.success(`Opening ${fileType.toUpperCase()} file in new tab`);
                                    return;
                                }
                            }

                            // For DOCX files, use direct download
                            if (fileType === 'docx') {
                                try {
                                    console.log('Using direct download endpoint for DOCX');
                                    // Make sure we're using the correct base URL
                                    const baseUrl = api.defaults.baseURL || 'https://coelsn-backend.onrender.com/api';

                                    // Create the direct download URL
                                    const downloadUrl = `${baseUrl}/journals/${id}/direct-download/docx`;

                                    console.log('Direct download URL:', downloadUrl);

                                    // Open the URL in a new tab
                                    window.open(downloadUrl, '_blank');
                                    toast.dismiss(toastId);
                                    toast.success(`Opening ${fileType.toUpperCase()} file in new tab`);
                                    return;
                                } catch (directDownloadError) {
                                    console.error('Direct download failed:', directDownloadError);
                                    // Continue with other methods
                                }
                            }

                            // For other files or as final fallback, use the regular URL
                            let cloudinaryUrl = checkData.downloadUrl || checkData.cloudinaryUrl;
                            console.log('Using URL for download:', cloudinaryUrl);

                            // Try direct download from Cloudinary
                            try {
                                const success = await downloadJournalFile(
                                    api.defaults.baseURL,
                                    id,
                                    fileType,
                                    journal?.title || 'journal',
                                    cloudinaryUrl
                                );

                                if (success) {
                                    toast.dismiss(toastId);
                                    return;
                                }
                            } catch (cloudinaryError) {
                                console.error('Cloudinary direct download failed:', cloudinaryError);
                                // Continue with normal download flow
                            }
                        }
                    } else {
                        toast.dismiss(toastId);
                        toast.error(`File not found: ${checkData.message || 'File not available'}`);
                        return;
                    }
                } catch (checkError) {
                    console.error('File existence check error:', checkError);
                    // Proceed with download attempt anyway
                }
            }

            try {
                // First try using the API service directly
                if (!isProduction) {
                    try {
                        console.log('Trying direct API download...');
                        const response = await api.journals.download(id, fileType);

                        // Create a download link
                        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
                        document.body.appendChild(link);
                        link.click();

                        // Clean up
                        setTimeout(() => {
                            window.URL.revokeObjectURL(blobUrl);
                            link.remove();
                        }, 100);

                        toast.dismiss(toastId);
                        toast.success(`File downloaded as ${fileType.toUpperCase()}`);
                        return;
                    } catch (apiError) {
                        console.error('API download failed:', apiError);
                        // Continue to fallback methods
                    }
                }

                // Use the downloadJournalFile utility as fallback
                const success = await downloadJournalFile(
                    api.defaults.baseURL,
                    id,
                    fileType,
                    journal?.title || 'journal'
                );

                // If the utility function didn't handle the toast, dismiss it
                if (!success) {
                    toast.dismiss(toastId);
                    toast.error(`Failed to download ${fileType.toUpperCase()} file. Please try again.`);
                }
            } catch (downloadError) {
                // If the utility fails, try a direct approach
                toast.dismiss(toastId);
                toast.info(`Trying alternative download method...`);

                // Determine if we're in production based on hostname
                const isLocalhost = window.location.hostname === 'localhost';
                const isProduction = !isLocalhost;

                console.log('Environment detection:', { isProduction, hostname: window.location.hostname });

                // Use only the known working path with different base URLs
                const urlsToTry = [];

                if (isProduction) {
                // For production (Render backend)
                // Primary API endpoint - this is the path that works locally
                urlsToTry.push(`https://coelsn-backend.onrender.com/api/journals/${id}/download/${fileType}`);

                // Removed fallback without /api prefix to avoid deployment issues
                // urlsToTry.push(`https://saharabackend-v190.onrender.com/journals/${id}/download/${fileType}`);
                } else {
                    // For local development - the known working path
                    urlsToTry.push(`http://localhost:5000/api/journals/${id}/download/${fileType}`);
                }

                // For convenience in the rest of the code
                const apiUrl = urlsToTry[0];
                const directFileUrl = urlsToTry.length > 1 ? urlsToTry[1] : urlsToTry[0];
                const staticFileUrl = urlsToTry.length > 1 ? urlsToTry[1] : urlsToTry[0];

                console.log('URLs to try:', { apiUrl, directFileUrl, staticFileUrl });

                try {
                    // Try using fetch API with the primary URL
                    toast.info(`Attempting to download file...`);
                    console.log(`Trying primary URL: ${apiUrl}`);

                    // Try the primary URL first
                    let response = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': '*/*',
                        },
                        credentials: 'omit', // Don't send cookies
                        mode: 'cors', // Explicitly set CORS mode
                        cache: 'no-cache' // Don't use cached response
                    });

                    // If the primary URL fails and we have a fallback, try it
                    if (!response.ok && urlsToTry.length > 1) {
                        console.log(`Primary URL failed, trying fallback: ${directFileUrl}`);
                        toast.info(`Trying fallback URL...`);

                        response = await fetch(directFileUrl, {
                            method: 'GET',
                            headers: {
                                'Accept': '*/*',
                            },
                            credentials: 'omit', // Don't send cookies
                            mode: 'cors', // Explicitly set CORS mode
                            cache: 'no-cache' // Don't use cached response
                        });

                        if (!response.ok) {
                            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
                        } else {
                            console.log(`Success with fallback URL`);
                            toast.success(`Download successful`);
                        }
                    } else if (response.ok) {
                        console.log(`Success with primary URL`);
                        toast.success(`Download successful`);
                    } else {
                        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
                    }

                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
                    document.body.appendChild(link);
                    link.click();

                    // Clean up
                    setTimeout(() => {
                        window.URL.revokeObjectURL(blobUrl);
                        link.remove();
                    }, 100);

                    toast.success(`File downloaded successfully`);
                } catch (fetchError) {
                    console.error('Fetch download failed:', fetchError);
                    toast.error(`Direct download failed: ${fetchError.message}`);

                    // As a last resort, try opening the URLs in new tabs
                    toast.info(`Opening download in new tab as last resort...`);

                    // Open the primary URL in a new tab
                    console.log(`Opening primary URL in new tab: ${apiUrl}`);
                    window.open(apiUrl, '_blank');

                    // If we have a fallback URL, open it after a short delay
                    if (urlsToTry.length > 1) {
                        setTimeout(() => {
                            toast.info(`Trying fallback URL in new tab...`);
                            console.log(`Opening fallback URL in new tab: ${directFileUrl}`);
                            window.open(directFileUrl, '_blank');
                        }, 1500);
                    }
                }
            }
        } catch (error) {
            console.error('Download error:', error);
            toast.error(`Error downloading file: ${error.message}`);
        }
    };

    if (loading) return <div className="loading-spinner">Loading journals...</div>;

    return (
        <div className="journal-list-container w-full mx-auto p-2 sm:p-4 lg:p-6">
            <div className="header flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Journal List</h2>
                <Link
                    to="/journals/new"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    + New Journal
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {journals.length === 0 && !loading ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg">No journals available</p>
                    <p className="mt-2">Start by creating a new journal!</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                        {journals.map((journal) => (
                            <div key={journal._id} className="journal-card border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full">
                                <h3
                                    className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => navigate(`/journals/${journal._id}`)}
                                >
                                    {journal.title || 'Untitled Journal'}
                                </h3>
                                <div className="abstract-section text-center mt-4 mb-2 flex-grow">
                                    <h4 className="abstract-heading text-lg font-semibold mb-2">Abstract</h4>
                                    <p className="text-gray-700 text-justify mx-auto max-w-xl">
                                        {journal.abstract ? journal.abstract : 'No abstract available'}
                                    </p>

                                    {/* Authors section */}
                                    <div className="authors-section mt-4">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Author{(journal.authors && journal.authors.length !== 1) ? 's' : ''}</h5>
                                        <p className="text-gray-800 font-medium">
                                            {journal.authors && journal.authors.length > 0
                                                ? journal.authors.join(', ')
                                                : 'Unknown author'}
                                        </p>
                                    </div>
                                </div>
                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                                    journal.status === "Published" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
                                }`}>
                                    {journal.status || 'Draft'}
                                </span>
                                <div className="actions mt-4 flex flex-wrap gap-3">
                                    <button
                                        onClick={() => navigate(`/journals/${journal._id}`)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDownload(journal._id, 'pdf')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => handleDownload(journal._id, 'docx')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Download DOCX
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination section */}
                    <div className="pagination-container mt-8 border-t border-gray-200 pt-6">
                        {/* Journal count */}
                        <div className="text-sm text-gray-600 text-center mb-4">
                            {journals.length > 0 ? (
                                <>
                                    Showing {journals.length > 0 ? (pagination.currentPage - 1) * 6 + 1 : 0}
                                    {' - '}
                                    {Math.min(pagination.currentPage * 6, pagination.totalJournals || 0)}
                                    {' of '}
                                    {pagination.totalJournals || 0} journals
                                </>
                            ) : (
                                <>No journals to display</>
                            )}
                        </div>

                        {/* Pagination controls - only show if we have more than 1 page */}
                        {pagination.totalPages > 1 && (
                            <div className="flex flex-col items-center">
                                <div className="pagination flex justify-center items-center">
                                    {/* Previous page button */}
                                    <button
                                        onClick={() => fetchJournals(pagination.currentPage - 1)}
                                        disabled={pagination.currentPage === 1}
                                        className="pagination-button rounded-l-md flex items-center justify-center"
                                        aria-label="Previous page"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {/* Page numbers */}
                                    <div className="flex">
                                        {(() => {
                                            // Calculate which page numbers to show
                                            const pageNumbers = [];
                                            const totalPages = pagination.totalPages;
                                            const currentPage = pagination.currentPage;

                                            // Always show first page
                                            if (totalPages > 3 && currentPage > 2) {
                                                pageNumbers.push(
                                                    <button
                                                        key={1}
                                                        onClick={() => fetchJournals(1)}
                                                        className="pagination-button bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        aria-label={`Go to page 1`}
                                                    >
                                                        1
                                                    </button>
                                                );

                                                // Add ellipsis if needed
                                                if (currentPage > 3) {
                                                    pageNumbers.push(
                                                        <span key="ellipsis1" className="pagination-ellipsis">
                                                            &hellip;
                                                        </span>
                                                    );
                                                }
                                            }

                                            // Calculate range around current page
                                            const startPage = Math.max(1, currentPage - 1);
                                            const endPage = Math.min(totalPages, currentPage + 1);

                                            // Add page numbers around current page
                                            for (let i = startPage; i <= endPage; i++) {
                                                pageNumbers.push(
                                                    <button
                                                        key={i}
                                                        onClick={() => fetchJournals(i)}
                                                        className={`pagination-button ${
                                                            currentPage === i
                                                                ? 'bg-blue-600 text-white font-bold'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                        aria-label={`Go to page ${i}`}
                                                        aria-current={currentPage === i ? "page" : undefined}
                                                    >
                                                        {i}
                                                    </button>
                                                );
                                            }

                                            // Add ellipsis and last page if needed
                                            if (totalPages > 3 && currentPage < totalPages - 1) {
                                                if (currentPage < totalPages - 2) {
                                                    pageNumbers.push(
                                                        <span key="ellipsis2" className="pagination-ellipsis">
                                                            &hellip;
                                                        </span>
                                                    );
                                                }

                                                // Always show last page
                                                pageNumbers.push(
                                                    <button
                                                        key={totalPages}
                                                        onClick={() => fetchJournals(totalPages)}
                                                        className="pagination-button bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        aria-label={`Go to page ${totalPages}`}
                                                    >
                                                        {totalPages}
                                                    </button>
                                                );
                                            }

                                            return pageNumbers;
                                        })()}
                                    </div>

                                    {/* Next page button */}
                                    <button
                                        onClick={() => fetchJournals(pagination.currentPage + 1)}
                                        disabled={pagination.currentPage === pagination.totalPages}
                                        className="pagination-button rounded-r-md flex items-center justify-center"
                                        aria-label="Next page"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Page indicator text */}
                                <div className="text-sm text-gray-600 mt-3">
                                    Page {pagination.currentPage || 1} of {pagination.totalPages || 1}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default JournalList;