import styles from "./page.module.css";
import Form from "../Components/Form"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Search Name</h1>
      <Form/>
    </main>
  );
}
