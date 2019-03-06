var interval;

export default {
    template: `<h1>About Us</h1>`,
    created() {
        // interval = setInterval(() => { console.log('About tab') }, 1000);
    },
    destroyed() {
        console.log('Exit About tab');
        // clearInterval(interval);
    }
}
