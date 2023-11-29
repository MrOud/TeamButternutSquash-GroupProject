import News from "../models/news.model.js";

const create = async (req, res) => {
  console.log(req.body);
  const news = new News(req.body);
  try {
    await news.save();
    return res.status(200).json({
      message: "News added!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Could not save news",
    });
  }
};

const list = async (req, res) => {
  try {
    let news = await News.find();
    res.json(news);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, list };
