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

const SERVICE_NAME = 'todos';

const Home: NextPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<TodoType[]>([]);
  const [value, setValue] = useState('');
  const [user, setUser] = useState<any>({});
  const [update, setUpdate] = useState<TodoType | null>();

  const getData = () => {
    kontenbase
      .service<TodoType>(SERVICE_NAME)
      .find()
      .then((res) => {
        setItems(res.data || []);
      });
  };

  const getProfile = () => {
    kontenbase.auth
      .profile()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        router.replace('/login');
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile();
      getData();
    } else {
      router.replace('/login');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = value;

    if (!name) {
      return;
    }

    try {
      await kontenbase.service<TodoType>(SERVICE_NAME).create({ name });
      setValue('');
      getData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = (item: TodoType) => {
    kontenbase
      .service<TodoType>(SERVICE_NAME)
      .deleteById(item._id)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleChangeCheckbox = (
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

    kontenbase
      .service<TodoType>(SERVICE_NAME)
      .updateById(data._id, { checked: e.target.checked })
      .catch((err) => {
        getData();
        alert(err.message);
      });
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

      kontenbase
        .service<TodoType>(SERVICE_NAME)
        .updateById(update._id, { name: update?.name })
        .catch((err) => {
          getData();
          alert(err.message);
        });
    }
  };

  return (
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
                    onChange={(e) => {
                      console.log(e.target.value);
                      setUpdate({
                        ...update,
                        name: e.target.value,
                      });
                    }}
                    autoFocus
                  />
                  <button type="submit">
                    <img className={styles.icon} alt="Save" src="/save.svg" />
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
                  <img
                    className={styles.icon}
                    onClick={() => setUpdate(item)}
                    alt="Delete"
                    src="/update.svg"
                  />
                  <img
                    className={styles.icon}
                    onClick={() => handleDelete(item)}
                    alt="Delete"
                    src="/delete.svg"
                  />
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
