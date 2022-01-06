// Declare The variables

const box = document.querySelector('.box');
const hideElements = document.getElementById('hidden');
const wrong = document.getElementById('wrong');
const switchBtn = document.getElementById('switch');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('btn');
const profileImg = document.getElementById('profile');
const userName = document.getElementById('name');
const nickName = document.getElementById('nick-name');
const nullBio = document.getElementById('null');
const userBio = document.getElementById('bio');
const JoiningDate = document.getElementById('date');
const repos = document.getElementById('repos');
const userFollowers = document.getElementById('followers');
const userFollowing = document.getElementById('following');
const userLocation = document.getElementById('location');
const userTwitter = document.getElementById('twitter');
const userWebsite = document.getElementById('website');
const userCompany = document.getElementById('company');

// Make a function to switch between light mode and dark mode

switchBtn.addEventListener('click', () => {
   // Change all the necessary elements(colors, backgrounds, and etc...)

   document.body.classList.toggle('bg-dark-mode');

   if (switchBtn.innerHTML === 'Dark <i class="ph-moon"></i>') {
      switchBtn.textContent = '';
      switchBtn.insertAdjacentHTML(
         'afterbegin',
         `Light <i class="ph-sun"></i>`
      );
   } else {
      switchBtn.textContent = '';
      switchBtn.insertAdjacentHTML(
         'afterbegin',
         `Dark <i class="ph-moon"></i>`
      );
   }
});

searchBtn.addEventListener('click', () => {
   hideElements.classList.add('hide');

   wrong.classList.add('hide');

   const Loader = `<div class="loader">Loading...</div>`;

   box.insertAdjacentHTML('afterbegin', Loader);

   // Before showing data, make a loading circle maybe for 3s

   setTimeout(function () {
      document.querySelector('.loader').remove();
      hideElements.classList.remove('hide');
      const gitHubUser = async () => {
         // Type a user name in the search box to fetch the user

         try {
            // document.getElementById('wrong').remove();
            const gitHubApi = await fetch(
               `https://api.github.com/users/${searchInput.value}`
            );
            const data = await gitHubApi.json();

            // Put the data in the right place

            profileImg.src = data.avatar_url;
            userName.textContent = data.name;
            nickName.textContent = data.login;
            JoiningDate.textContent = data.created_at.slice(0, 10);
            repos.textContent = data.public_repos;
            userFollowers.textContent = data.followers;
            userFollowing.textContent = data.following;
            userCompany.textContent =
               data.company === null ? 'Not available' : data.company;
            userLocation.textContent =
               data.location === '' || null ? 'Not available' : data.location;
            userWebsite.textContent =
               data.blog === '' ? 'Not available' : data.blog;
            userTwitter.textContent =
               data.twitter_username === null
                  ? 'Not available'
                  : data.twitter_username;
            data.bio === null
               ? ((nullBio.style.display = ''),
                 nullBio.textContent,
                 (userBio.style.display = 'none'))
               : ((userBio.style.display = ''),
                 (nullBio.style.display = 'none'),
                 (userBio.textContent = data.bio));
         } catch (e) {
            console.log(e);
            hideElements.classList.add('hide');
            wrong.classList.remove('hide');
         }
      };

      gitHubUser();
   }, 1000);
});
