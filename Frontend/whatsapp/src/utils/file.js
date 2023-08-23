export const getFileType = (type) => {
    switch (type) {
        case 'text/plain':
            return 'TXT';
        case 'application/pdf':
            return 'PDF';
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'DOCX';
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'PPTX';
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'XLSX ';
        case 'application/vnd.rar':
            return 'RAR';
        case 'application/zip':
            return 'ZIP';
        case 'audio/mpeg':
        case 'audio/wav':
            return 'AUDIO';
        case 'video/mp4':
        case 'video/mpeg':
            return 'VIDEO';
        default:
            return 'IMAGE';
    }
};

export const fileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
    'application/vnd.rar',
    'application/zip',
    'audio/mpeg',
    'audio/wav',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'pplication/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const imageTypes = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'image/webm',
    'video/mp4',
    'video/mpeg',
];

export const checkType = (type, referenceTypes) => {
    return referenceTypes.some((file_type) => file_type === type)
};