module.exports = {
    port: 8080,
    files: ["./src/dist/*.{html,htm,css,gz}"],
    server: {
        baseDir: "src/dist"
    }
};
