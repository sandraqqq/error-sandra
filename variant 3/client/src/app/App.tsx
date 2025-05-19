import { Router } from "./router/router";
import { Provider } from "react";
import store from "./store/store";
import styles from './styles/App.module.css';
import { Footer } from "@/widgets";

export function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <section className={styles.app}>
        <main className={styles.main}>
          <Router />
        </main>
        <Footer />
      </section>
    </Provider>
  )
}


