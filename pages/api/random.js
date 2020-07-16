
export default (req, res) => {
    console.log("hey got here!");
    res.status(200).json([
        {
          "comment": "First"
        },
        {
          "comment": "Nice post"
        }   
      ]);
  }
