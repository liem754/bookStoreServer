const oj = {
  ten: "liem",
  tuoi: 20,
  sinh: 2002,
  que: "phú yên",
};

const form = new FormData();

for (let i of Object.entries(oj)) {
  form.append(i[0], i[1]);
}
