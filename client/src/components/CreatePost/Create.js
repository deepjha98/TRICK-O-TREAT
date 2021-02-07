import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

////////////////////////////////////////////
const CreatePost = (props) => {
  //  State for image
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [imagePreview, setImagePreview] = useState("");
  const fileHandle = (event) => {
    setForm({ ...form, [event.target.name]: event.target.files[0] });
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setCurrentImage(event.target.files[0].name);
  };

  //React quill state
  const [value, setValue] = useState("");
  //   States
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  //Handle description
  const handleDescription = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const [slug, setSlug] = useState("");
  const [slugButton, setSlugButton] = useState(false);
  //FOR SETTING THE SLUG AFTER UPDATING
  const handleURL = (e) => {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-"));
  };
  const slugHandle = (event) => {
    setSlugButton(true);
    setSlug(event.target.value);
  };
  //FUNCTION TO HANDLE INPUTS
  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    const createSlug = event.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  };

  // ----CREATE POST ---
  const createPost = (event) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <>
      <Helmet>
        <title>Create Post</title>
        <meta
          name="description"
          content="This is the link to create a new post"
        />
      </Helmet>
      <div className="create mt-100">
        <div className="conatiner">
          <form onSubmit={createPost}>
            <div className="row">
              <div className="col-6 p-15">
                <div className="card">
                  <h3 className="card__h3">Create a new post</h3>

                  <div className="group">
                    <label htmlFor="title">Post Title</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleInput}
                      id="title"
                      className="group__control"
                      placeholder="Post title"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="image" className="image__label">
                      {currentImage}
                    </label>
                    <input
                      type="file"
                      onChange={fileHandle}
                      name="image"
                      id="image"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="body">Post Body</label>
                    <ReactQuill
                      theme="snow"
                      value={value}
                      name="body"
                      onChange={setValue}
                      id="body"
                      placeholder="Post body ..."
                    />
                  </div>
                  <div className="group">
                    <button className="btn btn-default btn-block" type="submit">
                      Create Post
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6 p-15">
                <div className="card">
                  <div className="group">
                    <label htmlFor="slug">Post URL</label>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      value={slug}
                      onChange={slugHandle}
                      className="group__control"
                      placeholder="POST URL"
                    />
                  </div>
                  <div className="group">
                    {slugButton ? (
                      <button
                        onClick={handleURL}
                        className="btn btn-default "
                        type="submit"
                      >
                        Update Slug
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="group">
                    <div className="imagePreview">
                      {imagePreview ? <img src={imagePreview} /> : " "}
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="description">Meta Description</label>
                    <textarea
                      name="description"
                      id="description"
                      cols="30"
                      defaultValue={form.description}
                      onChange={handleDescription}
                      rows="10"
                      placeholder="Meta description ..."
                      className="group__control"
                      maxLength="150"
                    ></textarea>
                    <p className="length">
                      {" "}
                      {form.description ? form.description.length : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
////////////////////////////////////////////
export default CreatePost;
