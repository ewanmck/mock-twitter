
const handleLike = async function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetID = parentBox.children("button").attr("id");
    let likeURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID + '/like';
    let unlikeURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID + '/unlike';
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID;

    if (buttonPressed.closest("a.like").hasClass("false")) {
        buttonPressed.closest("a.like").removeClass("false").addClass("true");
        parentBox.children(".level-left").append($('<p class="level-item like-toggle has-text-info">Liked!</p>'));
        const toggleLike = await axios({
            method: 'put',
            url: likeURL,
            withCredentials: true,
        });

    } else {
        buttonPressed.closest("a.like").removeClass("true").addClass("false");
        parentBox.children(".level-left").children().remove(".like-toggle");
        const toggleUnlike = await axios({
            method: 'put',
            url: unlikeURL,
            withCredentials: true,
        });

    }

    const tweet = await axios({
        method: 'get',
        url: tweetURL,
        withCredentials: true,
    });

    let likes = parentBox.children("p.stats")
    likes.text("Retweets: " + tweet.data.retweetCount + " Replies: " +
        tweet.data.replyCount + " Likes: " + tweet.data.likeCount);
}



const handleRetweet = async function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetID = parentBox.children("button").attr("id");
    let tweetBody = parentBox.children("p.has-text-centered").text();
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID;

    const retweet = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": tweetID,
            "body": tweetBody
        },
    });

    const tweet = await axios({
        method: 'get',
        url: tweetURL,
        withCredentials: true,
    });


    let likes = parentBox.children("p.stats")
    likes.text("Retweets: " + tweet.data.retweetCount + " Replies: " +
        tweet.data.replyCount + " Likes: " + tweet.data.likeCount);

    $("#feed").prepend(createTweet(retweet));
}

const handleDestory = async function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetID = parentBox.children("button").attr("id");

    const destory = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID,
        withCredentials: true,
    });

    parentBox.remove();
}



const handleReply = function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetID = parentBox.children("button").attr("id");

    if (buttonPressed.closest("a.reply").hasClass("false")) {
        let replyDiv = $("<div></div>").addClass("replybox");
        let replyBox = $("<textarea></textarea>").addClass("textarea is-info replytext").prop("placeholder", "What's your reply?");
        let replyButton = $("<button>Reply</button>").addClass("button is-small is-info is-outlined is-rounded replybutton");
        replyDiv.append(replyBox).append(replyButton);
        parentBox.children(".level-left").after(replyDiv);
        buttonPressed.closest("a.reply").removeClass("false").addClass("true");
        reloadHandlers();
    } else {
        parentBox.children(".replybox").remove();
        buttonPressed.closest("a.reply").removeClass("true").addClass("false");
    }



}

const handleReplyRequest = async function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetID = parentBox.children("button").attr("id");
    let replyText = parentBox.children(".replybox").children(".replytext").val();
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID;
    
    if (replyText !== "") {
        const result = await axios({
            method: 'post',
            url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                "type": "reply",
                "parent": tweetID,
                "body": replyText,
            },
        });

        parentBox.children(".replybox").remove();
        buttonPressed.closest("a.reply").removeClass("true").addClass("false");

        const tweet = await axios({
            method: 'get',
            url: tweetURL,
            withCredentials: true,
        });

        let likes = parentBox.children("p.stats")
        likes.text("Retweets: " + tweet.data.retweetCount + " Replies: " +
            tweet.data.replyCount + " Likes: " + tweet.data.likeCount);

        parentBox.append(createTweet(result.data));
        reloadHandlers()
    }


}

const handleEdit = function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetText = parentBox.children(".has-text-centered").text();

    if (buttonPressed.hasClass("false")) {
        let editDiv = $("<div></div>").addClass("editbox");
        let editBox = $("<textarea></textarea>").addClass("textarea is-info edittext").prop("placeholder", "Edit your tweet!").text(tweetText);
        let editButton = $("<button>Finish Edit</button>").addClass("button is-small is-info is-outlined is-rounded editbutton");

        editDiv.append(editBox).append(editButton);
        parentBox.children(".has-text-centered").replaceWith(editDiv);
        buttonPressed.removeClass("false").addClass("true").text("Stop Editing");
    } else {
        let textBody = parentBox.children(".editbox").children(".edittext").val();
        let text = $("<p></p>").text(textBody).addClass("has-text-centered");
        parentBox.children(".editbox").replaceWith(text);
        buttonPressed.removeClass("true").addClass("false").text("Edit");
    }

    reloadHandlers();

}

const handleEditRequest = async function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetID = parentBox.children("button").attr("id");
    let newText = parentBox.children(".editbox").children(".edittext").val();
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID;

    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID,
        withCredentials: true,
        data: {
            body: newText,
        },
    });


    parentBox.replaceWith(createTweet(result.data));
    reloadHandlers();
}