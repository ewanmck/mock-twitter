function reloadHandlers() {
    $(".expand").off("click", expandTweet);
    $(".like").off("click", handleLike);
    $(".retweet").off("click", handleRetweet);
    $(".reply").off("click", handleReply);
    $(".destroy").off("click", handleDestory);
    $(".edit").off("click", handleEdit);
    $(".replybutton").off("click", handleReplyRequest);
    $(".editbutton").off("click", handleEditRequest);

    $(".expand").on("click", expandTweet);
    $(".like").on("click", handleLike);
    $(".retweet").on("click", handleRetweet);
    $(".reply").on("click", handleReply);
    $(".destroy").on("click", handleDestory);
    $(".edit").on("click", handleEdit);
    $(".replybutton").on("click", handleReplyRequest);
    $(".editbutton").on("click", handleEditRequest);
}