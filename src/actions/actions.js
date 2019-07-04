import axios from 'axios';


export function getVisitorCount(cb) {
    axios.get(
        "https://skel-git-back.herokuapp.com/visitorcount/ping"
    ).then(response => {
        let res = response.data
        cb(res.num);
    }).catch(e => {
        console.log("Error: ", e)
        cb("N/A");
    });
}