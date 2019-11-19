const handleTweet = async function () {
    let tweet = $("#current").val();
    const response = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            body: tweet
        },
    });
    $("#feed").prepend(createTweet(response.data));
    $("#current").val("")
    reloadHandlers();
}

$(document).ready(function() {
    $("#button").on("click", handleTweet);
});