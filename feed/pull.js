
async function pullTweets() {
    const result = await axios({
        method: 'get',
        url: "https://comp426fa19.cs.unc.edu/a09/tweets",
        withCredentials: true,
    });
    return result.data;
}

function createTweet(tweet) {
    let currentTweet = $("<div></div>").addClass("box");
    currentTweet.add("p");
    let author = $("<strong></strong>").text(tweet.author).addClass("content");
    let text = $("<p></p>").text(tweet.body).addClass("has-text-centered content");
    let info = $("<p></p>").addClass("stats content").text("Retweets: " + tweet.retweetCount + " Replies: " +
     tweet.replyCount + " Likes: " + tweet.likeCount);
    let buttons = $('<div class=level-left> <a class="level-item reply false"> <span class=icon is-small> <i class="fas fa-reply"></i> </span> </a> <a class="level-item retweet false"> <span class=icon is-small> <i class="fas fa-retweet" aria-hidden=true></i> </span> </a> <a class="level-item like false"> <span class=icon is-small> <i class="fas fa-heart "aria-hidden=true></i> </span> </a> </div>');
    let expand = $("<button>Expand</button>").addClass("button is-small has-text-info is-outlined is-rounded expand false").attr('id', tweet.id);   
    if(tweet.isLiked) {
       buttons.append($('<p class="level-item like-toggle is-info">Liked!</p>'));
    }
    currentTweet.append(author).append(text).append(info).append(buttons).append(expand);
    if (tweet.isMine) {
        let destroy = $("<button>Delete</button>").addClass("button is-small is-info is-outlined is-rounded destroy");
        let edit = $("<button>Edit</button>").addClass("button is-small is-info is-outlined is-rounded edit false");
        currentTweet.append(destroy).append(edit);
        reloadHandlers();
    }
    
    return currentTweet;
}

$(document).ready(async function () {
    let tweets = await pullTweets();
    let tweetElements = [];
    for (let i = 0; i < tweets.length; i++) {
        tweetElements[i] = createTweet(tweets[i]);
    }
    
    $("#feed").append(tweetElements);
    reloadHandlers();
});