

const expandTweet = async function (event) {
    let buttonPressed = $(event.target);
    let parentBox = buttonPressed.closest("div.box");
    let tweetID = buttonPressed.attr('id');

    const response = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + tweetID,
        withCredentials: true,
    });

    if (buttonPressed.hasClass("false")) {
        if (response.data.replies != undefined) {
            let formattedReplies = [];
            let repliesList = response.data.replies;
            for (let i = 0; i < repliesList.length; i++) {
                formattedReplies[i] = createTweet(repliesList[i]);
            }
            buttonPressed.parent().append(formattedReplies);
            buttonPressed.removeClass("false").addClass("true").text("Unexpand");
            reloadHandlers();
        }
    } else {
        parentBox.children().remove("div.box");
        buttonPressed.removeClass("true").addClass("false").text("Expand");
    }

}

$(document).ready(function () {
    reloadHandlers();
});