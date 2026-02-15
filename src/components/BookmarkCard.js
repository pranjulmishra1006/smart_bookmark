export default function BookmarkCard({ bookmark, onDelete }) {
  if (!bookmark) return null; 

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
      <div>
        <h3 className="font-semibold">
          {bookmark.title || "Untitled"}
        </h3>

        {bookmark.url && (
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm"
          >
            {bookmark.url}
          </a>
        )}
      </div>

      <button
        onClick={() => onDelete(bookmark.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
      >
        Delete
      </button>
    </div>
  );
}
