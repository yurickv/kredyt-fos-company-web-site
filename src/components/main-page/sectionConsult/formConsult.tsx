"use client";
import { useState } from "react";
import { Toaster, toast } from "sonner";

interface ModalProps {
  data: {
    credits?: string | undefined;
    deposits?: string | undefined;
    duration?: number | undefined;
    targetSum?: number | undefined;
    dateInput?: string | undefined;
  };
  title: string;
  textButton: string;
  style?: string;
  onClose?: () => void;
}

export const ConsultForm: React.FC<ModalProps> = ({
  data,
  title,
  textButton,
  style,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    userMessage: "",
    titleMessage: title,
    credits: data.credits || "",
    deposits: data.deposits || "",
    duration: data.duration || "",
    targetSum: data.targetSum || "",
    dateInput: data.dateInput || "",
  });

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          "Ваша заявка подана успішно! Очікуйте дзвінка від працівника спілки"
        );
        if (onClose) {
          onClose();
        }
        setFormData({
          userName: "",
          phoneNumber: "",
          userMessage: "",
          titleMessage: "",
          credits: "",
          deposits: "",
          duration: "",
          targetSum: "",
          dateInput: "",
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error(`Failed to send message: ${error}`);
      console.error("Error sending message:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        style ? "flex flex-col gap-6" : "grid grid-cols-2 gap-4"
      } mt-6`}
    >
      <div>
        {style && (
          <label htmlFor="userName" className="text-netural_400">
            Ім’я*
          </label>
        )}
        <input
          className={`rounded-md px-[10px] py-[14px] ring-2 ring-transparent hover:ring-primary_300 focus:ring-primary_300 
        transition-all duration-300 w-full  outline-none  focus-within:ring-primary_300 active:ring-primary_300 ${
          style ? "bg-netural_200" : "max-w-[360px]"
        }`}
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder={style ? "" : "Ваше ім'я*"}
          required
        />
      </div>
      <div>
        {style && (
          <label htmlFor="phoneNumber" className="text-netural_400">
            Номер телефону*
          </label>
        )}
        <input
          className={`rounded-md px-[10px] py-[14px] ring-2 ring-transparent hover:ring-primary_300 focus:ring-primary_300 
        transition-all duration-300 w-full  outline-none  focus-within:ring-primary_300 active:ring-primary_300 ${
          style ? "bg-netural_200" : "max-w-[360px]"
        }`}
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+380*"
          required
        />
      </div>
      <div className={`${style ? "" : "col-span-2"}`}>
        {style && (
          <label htmlFor="userMessage" className="text-netural_400">
            Коментар
          </label>
        )}
        <textarea
          className={`rounded-md px-[10px] py-[14px] ring-2 ring-transparent hover:ring-primary_300 focus:ring-primary_300 
        transition-all duration-300 w-full outline-none focus-within:ring-primary_300 active:ring-primary_300 ${
          style ? "bg-netural_200" : "col-span-2"
        }`}
          name="userMessage"
          value={formData.userMessage}
          onChange={handleChange}
          placeholder={style ? "" : "Коментар"}
          rows={4}
        />
      </div>

      <div
        className={`flex flex-col group ${
          style
            ? "gap-6"
            : "md:flex-row gap-4 justify-between md:items-center col-span-2 mt-[34px]"
        } `}
      >
        <label
          className={`${
            style ? "w-full" : "max-w-[407px]"
          } flex gap-4 cursor-pointer`}
        >
          <input
            className={`min-w-6 h-6 ring-2 rounded-md ring-transparent transition-all duration-300  ${
              isCheckboxChecked ? "" : "group-hover:ring-accent_300"
            }`}
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
            required
          />
          Я надаю згоду на обробку моїх персональних даних
        </label>
        <button
          type="submit"
          disabled={!isCheckboxChecked}
          className={`text-netural_100 text-lg font-bold leading-4 tracking-wide relative overflow-hidden
      bg-gradient_1 rounded-md px-[34px] py-5 text-mainTitleBlack text-center block  w-full ${
        style ? "" : "md:min-w-[255px] md:w-[255px]"
      }`}
        >
          {textButton}
          <span
            className="absolute inset-0 flex items-center justify-center text-lg font-bold leading-4 tracking-wide text-netural_100
      bg-gradient_2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 focus:opacity-100"
          >
            {textButton}
          </span>
        </button>
      </div>
      <Toaster
        richColors
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          classNames: {
            title: "text-xl",
          },
        }}
        closeButton
      />
    </form>
  );
};
