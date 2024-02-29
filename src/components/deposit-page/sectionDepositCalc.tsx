"use client";
import { depositTermPersent } from "@/const/depositData";
import { useState } from "react";
import * as Yup from "yup";

const schema = Yup.object().shape({
  depositSum: Yup.number()
    .min(200, "Не менше 200грн.")
    .max(20000, "Не більше 20 000грн.")
    .required("Обов'язкове поле"),
});

export const SectionDepositCalc = () => {
  const [formData, setFormData] = useState({
    deposits: "Строковий",
    paymentTime: "Щомісячно",
    depositSum: 2000,
    depositDuration: 12,
  });
  const [errors, setErrors] = useState<{
    depositSum?: number;
  }>({});

  function resultPaiment(
    deposits: string,
    depositSum: number,
    depositDuration: number
  ) {
    let persent = 0;
    switch (deposits) {
      case "Строковий":
        depositTermPersent.find((option) => {
          if (option.term === depositDuration) {
            persent = option.persent;
          }
        });
        break;
      case "Накопичувальний":
        break;
      case "На вимогу":
        break;
      default:
        alert("Я не знаю таких значень");
    }
    // console.log((persent / 12) * depositDuration);
    return (persent / 12) * depositDuration * depositSum + depositSum;
  }
  const result = resultPaiment(
    formData.deposits,
    formData.depositSum,
    formData.depositDuration
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleScaleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Ensure that value is a number
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
    }
  };

  const validate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      (err as Yup.ValidationError).inner.forEach((error) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
      // console.log(errors.depositSum);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <section className="px-4 md:px-[78px] lg:px-[120px] pt-[82px] md:pt-[50px] lg:pt-[82px] pb-[50px] bg-netural_100">
      <h2 className="title">Депозитний калькулятор:</h2>
      <div className="mt-6 bg-netural_200 rounded-md px-4 md:px-10 py-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 md:gap-[34px]">
            <div className="flex flex-col gap-2">
              <label className="text-netural_400 text-base">Назва вкладу</label>
              <select
                className="rounded-md px-[10px] py-[14px] ring-2 ring-transparent hover:ring-primary_300 focus:ring-primary_300 
        transition-all duration-300 w-full max-w-[552px] outline-none  focus-within:ring-primary_300 active:ring-primary_300 text-primary_700"
                name="deposits"
                value={formData.deposits}
                onChange={handleChange}
                required
              >
                <option value="Строковий">Строковий</option>
                <option value="Накопичувальний">Накопичувальний</option>
                <option value="На вимогу">На вимогу</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-netural_400 text-base">Сума вкладу</label>
              <input
                className="rounded-md px-[10px] py-[14px] ring-2 ring-transparent hover:ring-primary_300 focus:ring-primary_300 
        transition-all duration-300 w-full max-w-[552px] outline-none  focus-within:ring-primary_300 active:ring-primary_300 text-primary_700"
                type="number"
                name="depositSum"
                value={formData.depositSum}
                onChange={handleScaleChange}
                min={200}
                max={20000}
                onBlur={validate}
                required
              />
              <input
                className="w-full max-w-[552px] -mt-3"
                type="range"
                name="depositSum"
                value={formData.depositSum}
                onChange={handleScaleChange}
                onBlur={validate}
                step={100}
                min={200}
                max={20000}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-netural_400 text-base">
                Строк вкладу (к-сть місяців)
              </label>
              <select
                className="rounded-md px-[10px] py-[14px] ring-2 ring-transparent hover:ring-primary_300 focus:ring-primary_300 
        transition-all duration-300 w-full max-w-[552px] outline-none  focus-within:ring-primary_300 active:ring-primary_300 text-primary_700"
                name="depositDuration"
                value={formData.depositDuration}
                onChange={handleScaleChange}
                required
              >
                {depositTermPersent.map((item) => (
                  <option
                    key={item.term}
                    value={item.term}
                    disabled={formData.deposits === "Накопичувальний"}
                  >
                    {item.term}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-netural_400 text-base">
                Виплата відсотків
              </label>
              <select
                className="rounded-md px-[10px] py-[14px] ring-2 ring-transparent hover:ring-primary_300 focus:ring-primary_300 
        transition-all duration-300 w-full max-w-[552px] outline-none  focus-within:ring-primary_300 active:ring-primary_300 text-primary_700"
                name="paymentTime"
                value={formData.paymentTime}
                onChange={handleChange}
                required
              >
                <option value="Щомісячно">Щомісячно</option>
                <option value="В кінці терміну">В кінці терміну</option>
              </select>
            </div>
          </div>

          <div className="bg-netural_100 rounded-md px-4 md:px-6 py-6">
            <div>
              <p>До виплати</p>
              <p>{result}</p>
            </div>
            <button
              type="submit"
              className="text-netural_100 text-lg font-extrabold leading-4 relative overflow-hidden 
      bg-gradient_1 rounded-md px-[34px] py-5 text-mainTitleBlack text-center block w-full"
            >
              Надіслати заявку
              <span
                className="absolute inset-0 flex items-center justify-center text-lg font-extrabold leading-4 text-netural_100
      bg-gradient_2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 focus:opacity-100"
              >
                Надіслати заявку
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
