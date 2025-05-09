// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong>
//                         <a
//                             href={journal.pdfUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                         >
//                             View PDF
//                         </a>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong>
//                         <a
//                             href={journal.pdfUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download PDF
//                         </a>
//                     </p>
//                 )}

//                 {journal?.docxFilePath && (
//                     <p>
//                         <strong>Word Document:</strong>
//                         <a
//                             href={journal.docxFilePath}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download Word Document
//                         </a>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     const handleDownload = async (fileType) => {
//         try {
//             const { data } = await api.get(`/journals/${id}/download/${fileType}`, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             toast.success(`Journal downloaded as ${fileType.toUpperCase()}`);
//         } catch (err) {
//             toast.error(`Failed to download ${fileType.toUpperCase()} file`);
//         }
//     };

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong>
//                         <button
//                             onClick={() => handleDownload('pdf')}
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download PDF
//                         </button>
//                     </p>
//                 )}

//                 {journal?.docxFilePath && (
//                     <p>
//                         <strong>Word Document:</strong>
//                         <button
//                             onClick={() => handleDownload('docx')}
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download Word Document
//                         </button>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;


// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     const handleDownload = async (fileType) => {
//         try {
//             const { data } = await api.get(`/journals/${id}/download/${fileType}`, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             toast.success(`Journal downloaded as ${fileType.toUpperCase()}`);
//         } catch (err) {
//             toast.error(`Failed to download ${fileType.toUpperCase()} file`);
//         }
//     };

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong> {' '}
//                         <button
//                             onClick={() => handleDownload('pdf')}
//                             className="text-blue-600 hover:underline ml-2"
//                         >
//                             Download PDF
//                         </button>
//                     </p>
//                 )}

//                 {journal?.docxFilePath && (
//                     <p>
//                         <strong>Word Document:</strong> {' '}
//                         <button
//                             onClick={() => handleDownload('docx')}
//                             className="text-blue-600 hover:underline ml-2"
//                         >
//                             Download Word Document
//                         </button>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 console.log("Journal data:", data); // Debug log
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     const handleDownload = async (fileType) => {
//         try {
//             const { data } = await api.get(`/journals/${id}/download/${fileType}`, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             toast.success(`Journal downloaded as ${fileType.toUpperCase()}`);
//         } catch (err) {
//             toast.error(`Failed to download ${fileType.toUpperCase()} file`);
//         }
//     };

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {/* Always show the PDF download button, like in JournalList */}
//                 <p>
//                     <strong>PDF:</strong> {' '}
//                     <button
//                         onClick={() => handleDownload('pdf')}
//                         className="text-blue-600 hover:underline ml-2"
//                     >
//                         Download PDF
//                     </button>
//                 </p>

//                 {/* Always show the Word download button, like in JournalList */}
//                 <p>
//                     <strong>Word Document:</strong> {' '}
//                     <button
//                         onClick={() => handleDownload('docx')}
//                         className="text-blue-600 hover:underline ml-2"
//                     >
//                         Download Word Document
//                     </button>
//                 </p>

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import './JournalDetails.css';

const JournalDetail = () => {
    const { id } = useParams(); // Get the journal ID from the URL
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                console.log('Fetching journal details for ID:', id);
                const response = await api.journals.getById(id);
                console.log("Journal data:", response.data); // Debug log
                setJournal(response.data);
            } catch (err) {
                console.error('Error fetching journal:', err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id]);

    const handleDownload = async (fileType) => {
        console.log(`Downloading ${fileType} file for journal ID:`, id);
        try {
            // Show loading toast
            const toastId = toast.loading(`Preparing ${fileType.toUpperCase()} download...`);

            // Get the base URL
            const baseUrl = api.defaults.baseURL || 'https://saharabackend-v190.onrender.com/api';

            // Create the direct download URL
            const downloadUrl = `${baseUrl}/journals/${id}/direct-download/${fileType}`;

            console.log('Direct download URL:', downloadUrl);

            // Open the URL in a new tab
            window.open(downloadUrl, '_blank');

            toast.dismiss(toastId);
            toast.success(`Opening ${fileType.toUpperCase()} file in new tab`);
        } catch (error) {
            console.error('Download error:', error);
            toast.error(`Error downloading file: ${error.message}`);
        }
    };

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

            <div className="space-y-3">
                <p className="text-justify"><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
                <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

                {/* Download buttons section */}
                <div className="flex flex-wrap gap-4 my-4">
                    {/* PDF download button */}
                    <button
                        onClick={() => handleDownload('pdf')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download PDF
                    </button>

                    {/* DOCX download button */}
                    <button
                        onClick={() => handleDownload('docx')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download DOCX
                    </button>
                </div>

                <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
                <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
                <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
            </div>
        </div>
    );
};

export default JournalDetail;