import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import { getLanguageFlag } from "./FriendCard";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOutgoingFriendReqs, sendFriendRequest } from "../lib/api";
import { capitialize } from "../lib/utils";

const RecommendationCard = ({ user }) => {
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={user.profilePic} alt={user.fullName} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPinIcon className="size-3 mr-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary ">
            {getLanguageFlag(user.nativeLanguage)}
            Native: {capitialize(user.nativeLanguage)}
          </span>
          <span className="badge badge-outline">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {capitialize(user.learningLanguage)}
          </span>
        </div>

        {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

        {/* Action button */}
        <button
          className={`btn w-full mt-2 ${
            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
          } `}
          onClick={() => sendRequestMutation(user._id)}
          disabled={hasRequestBeenSent || isPending}
        >
          {hasRequestBeenSent ? (
            <>
              <CheckCircleIcon className="size-4 mr-2" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlusIcon className="size-4 mr-2" />
              Send Friend Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
