const cards = document.querySelector("div.cards");

axios.get("https://api.github.com/users/asherkobin")
  .then(res => {
    cards.appendChild(createCard(res.data)); // ensure mine is first
  
    axios.get("https://api.github.com/users/asherkobin/followers")
      .then(res => {
        res.data.forEach(follower => {
          axios.get(follower.url).then (res => {
            cards.appendChild(createCard(res.data));
          });
        });
      });  
  });

function createCard(gitUserInfo) {
  const card = document.createElement("div");
  card.classList.add("card");
  
  const cardImg = document.createElement("img");
  cardImg.src = gitUserInfo.avatar_url;
  card.appendChild(cardImg);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  card.appendChild(cardInfo);

  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = gitUserInfo.name;
  cardInfo.appendChild(name);

  const userName = document.createElement("p");
  userName.classList.add("username");
  userName.textContent = gitUserInfo.login;
  cardInfo.appendChild(userName);

  const location = document.createElement("p");
  location.textContent = "Location: " + gitUserInfo.location;
  cardInfo.appendChild(location);

  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  profile.textContent = "Profile: ";
  profileLink.href = gitUserInfo.html_url;
  profileLink.textContent = gitUserInfo.html_url;
  profile.appendChild(profileLink);
  cardInfo.appendChild(profile);

  const followers = document.createElement("p");
  followers.textContent = "Followers: " + gitUserInfo.followers;
  cardInfo.appendChild(followers);

  const following = document.createElement("p");
  following.textContent = "Following: " + gitUserInfo.following;
  cardInfo.appendChild(following);

  const bio = document.createElement("p");
  bio.textContent = "Bio: " + gitUserInfo.bio;
  cardInfo.appendChild(bio);

  return card;
}
