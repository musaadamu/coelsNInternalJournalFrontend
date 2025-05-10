import React, { useState } from "react";
import "./JournalUpload.css";
import Footer from "./Footer.jsx";
import Navigation from "./Navigation.jsx";
import api from "../services/api";

const JournalUpload = () => {
    const [formData, setFormData] = useState({
        title: "",
        abstract: "",
        authors: "",
        keywords: "",
    });
    const [pdfFile, setPdfFile] = useState(null);
    const [docxFile, setDocxFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [pdfDragActive, setPdfDragActive] = useState(false);
    const [docxDragActive, setDocxDragActive] = useState(false);
    const [pdfFileName, setPdfFileName] = useState("");
    const [docxFileName, setDocxFileName] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePdfFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setPdfFile(selectedFile);
            setPdfFileName(selectedFile.name);
        }
    };

    const handleDocxFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setDocxFile(selectedFile);
            setDocxFileName(selectedFile.name);
        }
    };

    const handlePdfDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setPdfDragActive(true);
        } else if (e.type === "dragleave") {
            setPdfDragActive(false);
        }
    };

    const handleDocxDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDocxDragActive(true);
        } else if (e.type === "dragleave") {
            setDocxDragActive(false);
        }
    };

    const handlePdfDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPdfDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.name.endsWith('.pdf')) {
                setPdfFile(droppedFile);
                setPdfFileName(droppedFile.name);
                // Update the file input value for validation
                document.getElementById("pdfFileInput").files = e.dataTransfer.files;
            } else {
                setError("Please upload a PDF document (.pdf).");
                setTimeout(() => setError(""), 3000);
            }
        }
    };

    const handleDocxDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDocxDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.name.endsWith('.docx')) {
                setDocxFile(droppedFile);
                setDocxFileName(droppedFile.name);
                // Update the file input value for validation
                document.getElementById("docxFileInput").files = e.dataTransfer.files;
            } else {
                setError("Please upload a Word document (.docx).");
                setTimeout(() => setError(""), 3000);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        // Validate PDF file
        if (!pdfFile) {
            setError("Please upload a PDF document (.pdf).");
            setLoading(false);
            return;
        }

        // Validate DOCX file
        if (!docxFile) {
            setError("Please upload a Word document (.docx).");
            setLoading(false);
            return;
        }

        if (!formData.title.trim()) {
            setError("Please enter a title for your journal.");
            setLoading(false);
            return;
        }

        if (!formData.abstract.trim()) {
            setError("Please provide an abstract for your journal.");
            setLoading(false);
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("abstract", formData.abstract);

        // Process authors as array
        const authorNames = formData.authors
            .split(",")
            .map((name) => name.trim())
            .filter(Boolean);

        if (authorNames.length === 0) {
            setError("Please enter at least one author name.");
            setLoading(false);
            return;
        }

        // Convert authors array to a JSON string and append it as a single field
        formDataObj.append("authors", JSON.stringify(authorNames));

        // Process keywords as array
        const keywords = formData.keywords
            .split(",")
            .map((kw) => kw.trim())
            .filter(Boolean);

        // Convert keywords array to a JSON string and append it as a single field
        formDataObj.append("keywords", JSON.stringify(keywords));

        // Append both file types
        formDataObj.append("pdfFile", pdfFile);
        formDataObj.append("docxFile", docxFile);

        try {
            // Use the api service's journal upload method
            const response = await api.journals.upload(formDataObj);

            if (!response.data) {
                throw new Error("No data received from server");
            }

            setSuccess("Journal uploaded successfully!");
            resetForm();

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Clear success message after 5 seconds
            setTimeout(() => setSuccess(""), 5000);
        } catch (err) {
            let errorMsg = "Failed to upload journal";

            if (err.response) {
                errorMsg = err.response.data?.message || "Server error occurred";
            } else if (err.request) {
                errorMsg = "Network error - unable to reach server";
            } else {
                errorMsg = err.message || "Error uploading journal";
            }

            setError(errorMsg);

            // Scroll to top to show error message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: "", abstract: "", authors: "", keywords: "" });
        setPdfFile(null);
        setDocxFile(null);
        setPdfFileName("");
        setDocxFileName("");

        // Reset file inputs if they exist
        const pdfInput = document.getElementById("pdfFileInput");
        const docxInput = document.getElementById("docxFileInput");

        if (pdfInput) pdfInput.value = "";
        if (docxInput) docxInput.value = "";
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 sm:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800">Upload Journal</h2>
                                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Academic Publishing
                                </div>
                            </div>
                            
                            {/* Form content would go here */}
                            {/* For brevity, we're not including the full component */}
                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JournalUpload;
