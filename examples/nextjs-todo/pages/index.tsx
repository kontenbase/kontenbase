/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import formStyles from '../styles/Form.module.css';
import kontenbase from '../lib/kontenbase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '../components/AppBar';
import Head from 'next/head';
import TodoType from '../types/Todo';
import Loading from '../components/Loading';

const SERVICE_NAME = 'todos';

const Home: NextPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<TodoType[]>([]);
  const [value, setValue] = useState('');
  const [user, setUser] = useState<any>({});
  const [update, setUpdate] = useState<TodoType | null>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const { data, error } = await kontenbase
      .service<TodoType>(SERVICE_NAME)
      .find();

    if (!error) {
      setItems(data || []);
    }
  };

  const getProfile = async () => {
    const { user, error } = await kontenbase.auth.user();
    setLoading(false);
    if (error) {
      router.push('/login');
    } else {
      setUser(user);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile();
      getData();
    } else {
      router.push('/login');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = value;

    if (!name) {
      return;
    }
    const { error } = await kontenbase
      .service<TodoType>(SERVICE_NAME)
      .create({ name });

    if (error) {
      alert(error.message);
    } else {
      setValue('');
      getData();
    }
  };

  const handleDelete = async (item: TodoType) => {
    const { error } = await kontenbase
      .service<TodoType>(SERVICE_NAME)
      .deleteById(item._id);

    if (error) {
      alert(error.message);
    } else {
      getData();
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleChangeCheckbox = async (
    e: React.ChangeEvent<HTMLInputElement>,
    data: TodoType,
  ) => {
    setItems((items) => {
      return items.map((item) => {
        if (item._id === data._id) {
          item.checked = e.target.checked;
        }
        return item;
      });
    });

    const { error } = await kontenbase
      .service<TodoType>(SERVICE_NAME)
      .updateById(data._id, { checked: e.target.checked });

    if (error) {
      getData();
      alert(error.message);
    }
  };

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (update) {
      setItems((items) => {
        return items.map((item) => {
          if (item._id === update._id) {
            item.name = update.name;
          }
          return item;
        });
      });

      setUpdate(null);

      const { error } = await kontenbase
        .service<TodoType>(SERVICE_NAME)
        .updateById(update._id, { name: update?.name });

      if (error) {
        getData();
        alert(error.message);
      }
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Head>
        <title>Kontenbase - Todo</title>
      </Head>
      <AppBar user={user} />
      <div className="container">
        <form onSubmit={handleSubmit} className={styles.addWrapper}>
          <input
            name="name"
            className={formStyles.input}
            value={value}
            onChange={handleChangeValue}
            placeholder="Add your new todo"
            autoFocus
          />
          <button className={formStyles.button} type="submit">
            Add
          </button>
        </form>
        <div>
          {items.map((item) =>
            item._id === update?._id ? (
              <div className={styles.item} key={item._id}>
                <form
                  className={styles.updateWrapper}
                  onSubmit={handleSubmitUpdate}
                >
                  <input
                    name="name"
                    className={formStyles.input}
                    value={update.name}
                    placeholder="Update todo"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setUpdate({
                        ...update,
                        name: e.target.value,
                      });
                    }}
                    autoFocus
                  />
                  <button type="submit" className={styles.iconButton}>
                    <img alt="Save" src="/save.svg" />
                  </button>
                </form>
              </div>
            ) : (
              <div className={styles.item} key={item._id}>
                <div>
                  <input
                    checked={item.checked}
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={(e) => handleChangeCheckbox(e, item)}
                  />
                  <span
                    style={{
                      textDecoration: item.checked ? 'line-through' : 'none',
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={() => setUpdate(item)}
                    className={styles.iconButton}
                  >
                    <img alt="Update" src="/update.svg" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className={styles.iconButton}
                  >
                    <img alt="Delete" src="/delete.svg" />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
