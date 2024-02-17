import { Link } from "react-router-dom";
import service from "../appwrite/config";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div>
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
