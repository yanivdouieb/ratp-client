function error(value) {
  console.error(`Ratp Error : ${value}`);
}
function warn(value) {
  console.warn(`Ratp Warning : ${value}`);
}
async function send_(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (response.status === 400) {
    console.clear()
    return "Bad Request";
  } else {
    return data.result;
  }
}
class Ratp {
  constructor(version) {
    this.version = `v${version}`;
    if (version) {
      if (isNaN(version)) {
        error("API version can only be a number");
        return (this.version = null);
      } else {
        fetch(`https://api-ratp.pierre-grimaud.fr/v${version}/lines`).catch(
          (err) => {
            console.clear();
            error("API version does not exist");
          }
        );
      }
    } else {
      return warn("API version is not defined");
    }
  }
  async getDestinations(type, code) {
    if (!type) return error("type has not been defined");
    if (!code) return error("code has not been defined");
    return send_(
      `https://api-ratp.pierre-grimaud.fr/${this.version}/destinations/${type}/${code}`
    );
  }
  async getLines(type, code) {
    if (!type)
      return send_(`https://api-ratp.pierre-grimaud.fr/${this.version}/lines`);
    if (type) {
      if (!code)
        return send_(
          `https://api-ratp.pierre-grimaud.fr/${this.version}/lines/${type}`
        );
      return send_(
        `https://api-ratp.pierre-grimaud.fr/${this.version}/lines/${type}/${code}`
      );
    }
  }
  async getMissions(code, mission) {
    if (!code) return error("code has not been defined");
    if (!mission) return error("mission has not been defined");
    return send_(
      `https://api-ratp.pierre-grimaud.fr/${this.version}/missions/rers/${code}/${mission}`
    );
  }
  async getSchedules(type, code, station, way) {
    if (!type) return error("type has not been defined");
    if (!code) return error("code has not been defined");
    if (!station) return error("station has not been defined");
    if (!way) return error("way has not been defined");
    return send_(
      `https://api-ratp.pierre-grimaud.fr/${this.version}/schedules/${type}/${code}/${station}/${way}`
    );
  }
  async getStations(type, code, way) {
    if (!type) return error("type has not been defined");
    if (!code) return error("code has not been defined");
    if (way)
      return send_(`https://api-ratp.pierre-grimaud.fr/${this.version}/stations/${type}/${code}?way=${way}`);
    return send_(`https://api-ratp.pierre-grimaud.fr/${this.version}/stations/${type}/${code}`);
  }
  async getTraffic(type, code) {
    if (!type)
      return send_(`https://api-ratp.pierre-grimaud.fr/${this.version}/traffic`);
    if (type) {
      if (!code)
        return send_(
          `https://api-ratp.pierre-grimaud.fr/${this.version}/traffic/${type}`
        );
      return send_(
        `https://api-ratp.pierre-grimaud.fr/${this.version}/traffic/${type}/${code}`
      );
    }
  }
}
export default Ratp