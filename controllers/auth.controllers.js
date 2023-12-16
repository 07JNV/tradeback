var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/users");
const SECRET_KEY = "thisisuser";



const signup = async (req, res) => {
  console.log(req.body)

  const { username, email, password } = req.body;
  try {
    const existinguser = await User.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const result = await new User({
      fullName: username,
      email: email,
      password: hashedpassword,
      totalamount: 1000000,


    });



    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
    result.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};







const signin = async (req, res) => {


  const { email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email: req.body.email });
    if (!existinguser) {
      return res.status(404).json({ message: "user not found" });
    }

    const matchpassword = await bcrypt.compare(password, existinguser.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "invalid credentials" });

    }

    const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, SECRET_KEY);
    res.status(201).json({ user: existinguser, token: token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });

  }

};

const buy = async (req, res) => {


  const obj = req.body;
  const name = obj.N;
  const price = parseFloat(obj.price);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();


  const newCryptoObject = {
    name: name,
    symbol: obj.symbol,
    price: price,
    link: obj.link,
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}:${seconds}`,
    
  };

  console.log(newCryptoObject);

 

  try {


    const up = await User.findOne({ email: obj.email })
    if (up) {
      if (up.totalamount >= price) {
        up.crypto.push(newCryptoObject);
        up.set(`pre.${obj.symbol}`, obj.link);
        up.save();
        console.log(up);
        var ta = parseFloat(up.totalamount);
        ta = ta - parseFloat(obj.price);
        const doc = await User.findOneAndUpdate({ email: obj.email }, { totalamount: ta });
        res.status(201).json({ message: "successfully added" });
      }
      else {
        res.status(51).json({ message: "Sorry! insufficient balance " });
      }

    } else {
      res.status(500).send("unable to add");
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }

};


const buyg = async (req, res) => {


  try {

    const data = await req.query;
    const user = await User.findOne({ email: data.email });
    console.log(user);
    res.status(201).json({ user: user });
  }
  catch (error) {
    res.status(500).send("something went wrong");
  }
}


module.exports = { signup, signin, buy, buyg };