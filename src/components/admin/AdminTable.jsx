import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

/* UI-only color system (red / black / white) */
const actionColors = {
    edit: 'text-white bg-black hover:bg-zinc-800',
    delete: 'text-white bg-red-600 hover:bg-red-700',
    approve: 'text-red-600 hover:bg-red-600/10',
    reject: 'text-white bg-zinc-900 hover:bg-red-700',
};

const AdminTable = ({ columns, data, actions, onAction, isLoading }) => {

    const EmptyState = ({ children }) => (
        <div className="
            flex items-center justify-center p-14
            bg-white rounded-2xl
            border border-zinc-200
            shadow-sm
        ">
            <p className="text-zinc-500 text-sm tracking-wide">
                {children}
            </p>
        </div>
    );

    if (isLoading) {
        return <EmptyState>Loading data…</EmptyState>;
    }

    if (!data || data.length === 0) {
        return <EmptyState>No records found.</EmptyState>;
    }

    return (
        <div className="
            relative w-full overflow-x-auto
            rounded-2xl bg-white
            shadow-lg border border-zinc-200
        ">
            <table className="min-w-full border-separate border-spacing-0 table-fixed">

                {/* ===== HEADER ===== */}
                <thead>
                    <tr className="bg-black">
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="
                                    px-6 py-4 text-left
                                    text-[11px] font-extrabold
                                    uppercase tracking-widest
                                    text-white
                                    first:rounded-tl-2xl
                                "
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && (
                            <th className="
                                px-6 py-4 text-center
                                text-[11px] font-extrabold
                                uppercase tracking-widest
                                text-white
                                last:rounded-tr-2xl
                            ">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                {/* ===== BODY ===== */}
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id || rowIndex}
                            className="
                                border-b border-zinc-200
                                hover:bg-zinc-50
                                transition-colors
                                last:border-0
                            "
                        >
                            {columns.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="
                                        px-6 py-4 text-sm
                                        text-zinc-800
                                        align-middle
                                        whitespace-nowrap
                                    "
                                >
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </td>
                            ))}

                            {actions && (
                                <td className="px-6 py-4 text-center align-middle">
                                    <div className="inline-flex items-center gap-2">
                                        {actions.includes('edit') && (
                                            <button
                                                onClick={() => onAction('edit', row)}
                                                title="Edit"
                                                className={`
                                                    p-2 rounded-full text-sm
                                                    transition-all duration-200
                                                    ${actionColors.edit}
                                                `}
                                            >
                                                <FaEdit />
                                            </button>
                                        )}

                                        {actions.includes('delete') && (
                                            <button
                                                onClick={() => onAction('delete', row)}
                                                title="Delete"
                                                className={`
                                                    p-2 rounded-full text-sm
                                                    transition-all duration-200
                                                    ${actionColors.delete}
                                                `}
                                            >
                                                <FaTrash />
                                            </button>
                                        )}

                                        {actions.includes('approve') && (
                                            <button
                                                onClick={() => onAction('approve', row)}
                                                title="Approve"
                                                className={`
                                                    p-2 rounded-full text-sm
                                                    transition-all duration-200
                                                    ${actionColors.approve}
                                                `}
                                            >
                                                <FaCheck />
                                            </button>
                                        )}

                                        {actions.includes('reject') && (
                                            <button
                                                onClick={() => onAction('reject', row)}
                                                title="Reject"
                                                className={`
                                                    p-2 rounded-full text-sm
                                                    transition-all duration-200
                                                    ${actionColors.reject}
                                                `}
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;
