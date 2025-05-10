import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation.jsx';

const JournalSubmission = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Journal Submission Guidelines</h1>
                        
                        <div className="prose max-w-none">
                            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">About the Journal</h2>
                            <p className="mb-4">
                                The COELSN Journal of Interdisciplinary Academic Research and Development is a peer-reviewed academic journal that publishes original research, review articles, and scholarly contributions across multiple disciplines. Our journal aims to promote interdisciplinary research and foster collaboration between researchers from different fields.
                            </p>
                            
                            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Submission Requirements</h2>
                            <p className="mb-4">
                                All manuscripts submitted to the COELSN Journal must adhere to the following guidelines:
                            </p>
                            
                            <ul className="list-disc pl-6 mb-6">
                                <li className="mb-2">
                                    <strong>Original Work:</strong> All submissions must be original work that has not been published elsewhere or is not under consideration for publication in another journal.
                                </li>
                                <li className="mb-2">
                                    <strong>Language:</strong> Manuscripts must be written in English. Authors whose native language is not English are encouraged to have their manuscripts checked by a native English speaker before submission.
                                </li>
                                <li className="mb-2">
                                    <strong>Length:</strong> Research articles should be between 4,000 and 8,000 words, including references, tables, and figures. Review articles may be longer, up to 10,000 words.
                                </li>
                                <li className="mb-2">
                                    <strong>Format:</strong> Manuscripts must be submitted in both PDF and Microsoft Word (.docx) formats. The text should be double-spaced, in 12-point Times New Roman font, with 1-inch margins.
                                </li>
                                <li className="mb-2">
                                    <strong>Structure:</strong> Manuscripts should include the following sections: Title, Abstract, Keywords, Introduction, Literature Review, Methodology, Results, Discussion, Conclusion, and References.
                                </li>
                                <li className="mb-2">
                                    <strong>Abstract:</strong> An abstract of 150-250 words should accompany the manuscript, summarizing the research question, methodology, findings, and implications.
                                </li>
                                <li className="mb-2">
                                    <strong>Keywords:</strong> 4-6 keywords that best describe the content of the manuscript should be provided.
                                </li>
                                <li className="mb-2">
                                    <strong>References:</strong> All references should follow the APA (7th edition) citation style.
                                </li>
                            </ul>
                            
                            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Peer Review Process</h2>
                            <p className="mb-4">
                                All submissions undergo a rigorous double-blind peer review process. The review process typically takes 4-6 weeks. Authors will be notified of the editorial decision as soon as the review process is complete.
                            </p>
                            
                            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Publication Ethics</h2>
                            <p className="mb-4">
                                The COELSN Journal adheres to the highest standards of publication ethics. Authors must disclose any conflicts of interest and ensure that their research has been conducted ethically. Plagiarism, data fabrication, or any other form of academic misconduct will result in immediate rejection of the manuscript.
                            </p>
                            
                            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Copyright and Licensing</h2>
                            <p className="mb-4">
                                Authors retain copyright of their work but grant the COELSN Journal the exclusive right to publish and distribute the article. All articles published in the COELSN Journal are licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
                            </p>
                            
                            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Submission Process</h2>
                            <p className="mb-4">
                                To submit your manuscript, please follow these steps:
                            </p>
                            
                            <ol className="list-decimal pl-6 mb-6">
                                <li className="mb-2">Create an account on our journal submission platform</li>
                                <li className="mb-2">Prepare your manuscript according to the guidelines above</li>
                                <li className="mb-2">Upload both PDF and Word versions of your manuscript</li>
                                <li className="mb-2">Provide all required metadata (title, abstract, keywords, etc.)</li>
                                <li className="mb-2">Submit your manuscript</li>
                            </ol>
                            
                            <div className="bg-blue-50 p-6 rounded-lg mt-8">
                                <h3 className="text-lg font-semibold text-blue-800 mb-3">Ready to Submit?</h3>
                                <p className="text-blue-700 mb-4">
                                    We welcome your contribution to the COELSN Journal of Interdisciplinary Academic Research and Development. If you have any questions about the submission process, please contact our editorial team.
                                </p>
                                <Link
                                    to="/journals/new"
                                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Submit Your Manuscript
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JournalSubmission;
