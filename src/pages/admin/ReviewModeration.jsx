import React, { useEffect, useState } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import { reviewService } from '@/services/api/reviewService'
import { toast } from 'react-toastify'

const ReviewModeration = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchReviews = async () => {
        try {
            setLoading(true)
            const res = await reviewService.getAllReviews()
            // backend returns array directly OR {data: []}
            setReviews(res.data || res)
        } catch (err) {
            toast.error('Failed to load reviews')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const handleAction = async (action, row) => {
        try {
            if (action === 'approve') {
                await reviewService.approveReview(row.id)
                toast.success('Review approved')
            }

            if (action === 'reject') {
                await reviewService.rejectReview(row.id)
                toast.success('Review rejected')
            }

            if (action === 'delete') {
                await reviewService.deleteReview(row.id)
                toast.success('Review deleted')
            }

            fetchReviews() // refresh table
        } catch {
            toast.error('Action failed')
        }
    }

    const columns = [
        {
            header: 'Movie',
            accessor: 'movieId'
        },
        {
            header: 'User',
            accessor: 'userName'
        },
        {
            header: 'Rating',
            accessor: 'rating'
        },
        {
            header: 'Review',
            accessor: 'comment',
            render: row => (
                <span className="block max-w-sm truncate">
                    {row.comment}
                </span>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: row => (
                <span
                    className={`text-xs font-bold uppercase ${row.status === 'approved'
                            ? 'text-green-600'
                            : row.status === 'rejected'
                                ? 'text-red-600'
                                : 'text-yellow-600'
                        }`}
                >
                    {row.status}
                </span>
            )
        }
    ]

    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-6">Review Moderation</h1>

            <AdminTable
                columns={columns}
                data={reviews}
                actions={['approve', 'reject', 'delete']}
                onAction={handleAction}
                isLoading={loading}
            />
        </div>
    )
}

export default ReviewModeration
