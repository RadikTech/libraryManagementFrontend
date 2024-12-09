import React from 'react';

const ErrorDialog = ({ show, onClose, message }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-900 opacity-50 absolute inset-0"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                <h3 className="text-xl font-semibold text-red-600">Error</h3>
                <p className="mt-4 text-gray-800">{message}</p>
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorDialog;
