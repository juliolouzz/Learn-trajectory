import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// In-memory array to store blog posts, but when server restarts you lose all data
let blogPosts = [];

// Render the homepage with all blog posts
app.get('/', (req, res) => {
  res.render('index.ejs', { blogData: blogPosts });
});

app.get("/index.ejs", (req, res) => {
  res.render('index.ejs', { blogData: blogPosts });
});

app.get("/Features.ejs", (req, res) => {
  res.render("Features.ejs");
});

app.get("/about.ejs", (req, res) => {
  res.render("about.ejs");
});

// Render the new blog post page, which has a form, to create a new blog post, which will be sent to the server, which will then be 
// added to the in-memory array
app.post('/submit', (req, res) => {
  const { blogname, blogtitle, blogtext } = req.body;
  const newBlogPost = { blogname, blogtitle, blogtext };

  // Add the new blog post to the in-memory array
  blogPosts.push(newBlogPost);

  // Render the homepage with all blog posts
  res.render('index.ejs', { blogData: blogPosts });
});

// Handle post deletion
app.post('/delete/:index', (req, res) => {
  const indexToDelete = req.params.index;

  // Remove the blog post at the specified index from the array
  blogPosts.splice(indexToDelete, 1);

  // Render the homepage with the updated blog posts
  res.render('index.ejs', { blogData: blogPosts });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});