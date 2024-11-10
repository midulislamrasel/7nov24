"use client";
import { useState } from "react";

export default function PaginationForm() {
    const [skip, setSkip] = useState(1);
    const [limit, setLimit] = useState(7);

    const handleSubmit = (event) => {
        event.preventDefault();
        const query = new URLSearchParams({
            skip: skip.toString(),
            limit: limit.toString(),
        });
        window.location.href = `http://localhost:3001/post?${query.toString()}`;
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label>
                Skip:
                <input
                    type="number"
                    value={skip}
                    onChange={(e) => setSkip(e.target.value)}
                    min="0"
                    className="border rounded p-2"
                />
            </label>

            <label>
                Limit:
                <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    min="1"
                    className="border rounded p-2"
                />
            </label>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Submit
            </button>
        </form>
    );
}
