import create from "zustand";

const useStore = create(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
}));

const App = () => {
  const { count, increase } = useStore();
  return (
    <>
      <div>app 컴포넌트 {count}</div>
      <button
        onClick={() => {
          increase();
        }}
      >
        {" "}
        버튼{" "}
      </button>
      <Card />
    </>
  );
};

const Card = () => {
  const { count } = useStore();
  return (
    <>
      <div>Card 컴포넌트 {count}</div>
    </>
  );
};

export default App;
