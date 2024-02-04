const apiurl = "https://api.github.com/users/";
const main = document.querySelector("#main");
const empty = document.querySelector("#empty");

const getUser = async (username) => {
  const response = await fetch(apiurl + username);
  const data = await response.json();
  console.log(data);
  const card = `<div class="card">
            <div class="img">
                <img src="${data.avatar_url}" alt="profile-photo" class="avatar">
            </div>

  <div class="user-info">
      <h2>${data.name}</h2>
      <p>${data.bio}</p>

      <ul class="info">
          <li>${data.followers}<strong> Followers</strong></li>
          <li>${data.following}<strong> Following</strong></li>
          <li>${data.public_repos}<strong> Repos</strong></li>
      </ul>
      
      <div id="repos">
      </div>
     
  </div>
</div>`;
  main.innerHTML = card;
  getRepos(username);
};

getUser("codewithmanmohan");
const getRepos = async (username) => {
  const repos = document.querySelector("#repos");
  const response = await fetch(apiurl + username + "/repos");
  const data = await response.json();
  data.forEach((item) => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = "_blank";
    repos.appendChild(elem);
  });
};

const formSubmit = () => {
  const searchbox = document.querySelector("#search");

  if (searchbox.value.trim() === "") {
    main.innerHTML = `<div class="empty">
   <h2>!Input field is empty. please enter a username</h2>
</div>`;
    return false;
  } else {
    getUser(searchbox.value);
  }

  return false;
};

/* <a href="#" target="_blank" class="repo">Repo1</a>
          <a href="#" target="_blank" class="repo">Repo2</a>
          <a href="#" target="_blank" class="repo">Repo3</a> */
