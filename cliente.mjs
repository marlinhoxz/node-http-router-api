const base = "http://localhost:3000";

    const resp = await fetch(base + "/")
    console.log(resp.ok, resp.status)

