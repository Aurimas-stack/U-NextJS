import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  /*const [session, loading] = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const session = await getSession();
      if(!session) {
        window.location.href = "/auth";
      }
      setLoadedSession(session);
      setIsLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }*/
  const changePasswordHandler = async (passwords) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwords),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = response.json();
    console.log(data)
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
