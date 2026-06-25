import { useState } from "react";
import { addMovie } from "../services/movieService";

function MovieForm() {
    const [movie, setMovie] = useState({
        title: "",
        description: "",
        language: "",
        releaseDate: "",
        coverImage: "",
        actors: [] // array of actor IDs
    });

    const [actor, setActor] = useState({
        id: "",
        name: "",
        dateOfBirth: ""
    });

    // Handle movie input changes
    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleActorChange = (e) => {
        setActor({ ...actor, [e.target.name]: e.target.value });
    };

    const addActor = () => {
        if (!actor.name || !actor.id) {
            alert("Please enter actor ID and name");
            return;
        }

        const actorId = Number(actor.id);
        if (movie.actors.includes(actorId)) {
            alert("Actor already added");
            return;
        }

        setMovie({
            ...movie,
            actors: [...movie.actors, actorId]
        });

        setActor({ id: "", name: "", dateOfBirth: "" });
    };

    const removeActor = (id) => {
        setMovie({
            ...movie,
            actors: movie.actors.filter(a => a !== id)
        });
    };

    // ✅ Only one handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
     

        if (!movie.title || !movie.description || !movie.language || !movie.releaseDate) {
            alert("Please fill all movie details");
            return;
        }

        if (movie.actors.length === 0) {
            alert("Please add at least one actor ID");
            return;
        }

        try {
            alert("Submitting movie...");
            const payload = {
          
                Title: movie.title,
                Description: movie.description,
                Language: movie.language,
                ReleaseDate: new Date(movie.releaseDate).toISOString(),
                CoverImage: movie.coverImage,
                Actors: movie.actors
            };


       

            const res = await addMovie(payload);

            console.log("Movie created:", res.data);
            alert("Movie created successfully!");

            setMovie({
                title: "",
                description: "",
                language: "",
                releaseDate: "",
                coverImage: "",
                actors: []
            });
        } catch (error) {
            console.error("Full error object:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request sent but no response:", error.request);
            } else {
                console.error("Axios setup error:", error.message);
            }
            alert("Error creating movie. See console for details.");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
                <textarea name="description" placeholder="Description" value={movie.description} onChange={handleChange} />
                <input name="language" placeholder="Language" value={movie.language} onChange={handleChange} />
                <input type="date" name="releaseDate" value={movie.releaseDate} onChange={handleChange} />
                <input name="coverImage" placeholder="Cover Image URL" value={movie.coverImage} onChange={handleChange} />

                <hr />
                <h3>Add Actor</h3>
                <input name="id" placeholder="Actor ID" value={actor.id} onChange={handleActorChange} />
                <input name="name" placeholder="Actor Name" value={actor.name} onChange={handleActorChange} />
                <input type="date" name="dateOfBirth" value={actor.dateOfBirth} onChange={handleActorChange} />
                <button type="button" onClick={addActor}>Add Actor</button>

                <ul>
                    {movie.actors.map((id) => (
                        <li key={id}>
                            Actor ID: {id} <button type="button" onClick={() => removeActor(id)}>Remove</button>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={() => {
                        alert("BUTTON CLICKED");
                        handleSubmit(new Event("submit"));
                    }}
                >
                    Save Movie
                </button>


            </form>
        </div>
    );
}

export default MovieForm;



////import { useState } from "react";
////import { addMovie } from "../services/movieService";

////function TestApi() {
////    const [msg, setMsg] = useState("");

////    const callApi = async () => {
////        try {
////            const payload = {
////                Title: "Test Movie",
////                Description: "This is a test"
////            };

////            console.log("Sending payload:", payload);

////            const res = await addMovie(payload);
////            console.log("Response:", res.data);
////            setMsg("API called successfully!");
////        } catch (err) {
////            console.error("Axios error:", err);
////            setMsg("API failed - see console");
////        }
////    };

////    return (
////        <div style={{ padding: "20px" }}>
////            <button onClick={callApi}>Test API</button>
////            <p>{msg}</p>
////        </div>
////    );
////}


////export default TestApi;
