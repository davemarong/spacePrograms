let futureLaunches_Container = document.querySelector(
  ".futureLaunches_Container"
);
let previousLaunches_Container = document.querySelector(
  ".previousLaunches_Container"
);
const sortLaunches = (launches) => {
  const futureLaunches = launches.filter((launch) => launch.upcoming === true);
  const previousLaunches = launches.filter(
    (launch) => launch.upcoming === false
  );
  return [futureLaunches, previousLaunches.reverse()];
};

const fetchPrograms = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/launches");
  const data = await response.json();
  const allLaunches = data.slice(-32);
  let [futureLaunches, previousLaunches] = sortLaunches(allLaunches);
  futureLaunches_Container.innerHTML += futureLaunches
    .map((launch, id) => {
      let launchDate = launch.date_utc.slice(0, 10);
      return `
    <div class="futureLaunches_card">
      <h2>${launch.name}</h2>
      <table class="futureLaunches_card_table">
        <tr>
          <th>Launch date</th>
          <td>${launchDate}</td>
        </tr>
      </table>
    </div>`;
    })
    .join(" ");

  previousLaunches_Container.innerHTML += previousLaunches
    .map((launch, id) => {
      let launchDate = launch.date_utc.slice(0, 10);
      let capsuleReused;

      if (launch.fairings === null) {
        capsuleReused = "No";
      } else if (launch.fairings.reused === false) {
        capsuleReused = "No";
      } else {
        capsuleReused = "Yes";
      }

      return `
    <div class="previousLaunches_card">
      <h2>${launch.name}</h2>
      <img width="200px" src=${launch.links.patch.small}>
      <table class="previousLaunches_card_table">
        <tr>
            <th>Launch date</th>
            <td>${launchDate}</td>
        </tr>
        <tr>
            <th>Mission status</th>
            <td>${launch.success ? "Success" : "Failure"}</td>
        </tr>
        <tr>
             <th>Capsule reused</th>
             <td>${capsuleReused}</td>
        </tr>
      </table>
      <h3>Links to articles:</h3>
      <table class="previousLaunches_card_table">
        <tr>
            <th>Spaceflightnow</th>
            <td>${
              launch.links.article
                ? `<a href=${launch.links.article}>Link</a>`
                : "No"
            }</td>
        </tr>
        <tr>
            <th>Wikipedia</th>
            <td>${
              launch.links.wikipedia
                ? `<a href=${launch.links.wikipedia}>Link</a>`
                : "No"
            }</td>
        </tr>
        <tr>
            <th>Reddit (campaign)</th>
            <td>${
              launch.links.reddit.campaign
                ? `<a href=${launch.links.reddit.campaign}>Link</a>`
                : "No"
            }</td>
        </tr>
        <tr>
            <th>Reddit (launch)</th>
            <td>${
              launch.links.reddit.launch
                ? `<a href=${launch.links.reddit.launch}>Link</a>`
                : "No"
            }</td>
        </tr>
        <tr>
            <th>Reddit (recovery)</th>
            <td>${
              launch.links.reddit.recovery
                ? `<a href=${launch.links.reddit.recovery}>Link</a>`
                : "No"
            }</td>
        </tr>
      </table>
      <p class="previousLaunches_card_details">${
        launch.details ? launch.details : "No details"
      } </p>
    </div>`;
    })
    .join(" ");
};
fetchPrograms();
