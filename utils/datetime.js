export function formatDateTime (date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute:'2-digit'
    });
}

export function formatDate (date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function formatTime (date) {
    return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute:'2-digit'
    });
}