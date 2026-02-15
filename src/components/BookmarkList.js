import BookmarkCard from "./BookmarkCard";

export default function BookmarkList({ bookmarks = [], onDelete }) {
  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No bookmarks yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks
        .filter(Boolean)
        .map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
}
