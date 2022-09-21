import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CTA from "../components/CTA";
import ErrorText from "../components/ErrorText";
import Field, { FieldArea } from "../components/Field";
import Skeleton from "../components/skeleton";
import { toastError, toastSuccess } from "../components/Toast";
import { BookModel } from "../models/bookModel";
import { useCreateBookMutation, useGetBookByIdQuery, useUpdateBookByIdMutation } from "../services/booksApi";
import { createBookValidation } from "../utils/validation";


const ManageBookScreen = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [addBook] = useCreateBookMutation()
  const [updateBook] = useUpdateBookByIdMutation()

  const { data: editBookData, isLoading, isError } = useGetBookByIdQuery(id ? id : "", { skip: !id || id === "" })
  const { register, handleSubmit, setValue, reset, formState: { errors, isDirty } } = useForm<BookModel>({
    mode: 'onChange', resolver: yupResolver(createBookValidation), defaultValues: editBookData
  })


  useEffect(() => {
    if (id && editBookData) {
      setValue("title", editBookData.title)
      setValue("author", editBookData.author)
      setValue("thumbnailUrl", editBookData.thumbnailUrl)
      setValue("genre", editBookData.genre)
      setValue("shortDescription", editBookData.shortDescription)
      setValue("longDescription", editBookData.longDescription)
      setValue("pricePerDay", editBookData.pricePerDay)
    }
  }, [id, editBookData])


  const onSubmit = (values: BookModel) => {

    if (!id) {

      values.publishedDate = new Date().toISOString()
      values.price = Math.floor(Math.random() * 10)
      values.pageCount = Math.floor(Math.random() * 1000).toString()

      addBook(values).unwrap().then((result) => {
        toastSuccess("Book created successfully")
        navigate('/home');
        reset()
      }).catch((err) => {
        if (err && err.data) {
          toastError(err.data.message)
        }
        toastError("Something went wrong !")
      })
    } else {

      if (editBookData) {

        let toUpdateBookObject: Partial<BookModel> = {};
        toUpdateBookObject.id = id;

        toUpdateBookObject = { ...values }

        updateBook({ book: toUpdateBookObject, id: id }).unwrap().then((result) => {
          toastSuccess("Book updated successfully")
          navigate('/home');
          reset()
        }).catch((err) => {
          if (err && err.data) {
            toastError(err.data.message)
          }
          toastError("Something went wrong !")
        })
      }
    }
  }


  if (id && (!editBookData || isLoading || isError)) {
    return (
      <div className="flex flex-col  overflow-hidden py-3">
        <div className="w-full p-6 mx-auto bg-white rounded-md lg:max-w-xl flex flex-row justify-center items-center">
          <Skeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col  overflow-hidden py-3">
      <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md lg:max-w-xl">
        {!id && <div className="text-4xl font-semibold mx-auto">Create new book</div>}
        {id && <div className="text-4xl font-semibold mx-auto">Edit book</div>}
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Title
            </label>
            <Field
              {...register("title")}
              type="text"
              name="title"
            />
            <ErrorText err={errors.title?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Author
            </label>
            <Field
              {...register("author")}
              type="text"
              name="author"
            />
            <ErrorText err={errors.author?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Genre
            </label>
            <Field
              {...register("genre")}
              type="text"
              name="genre"
            />
            <ErrorText err={errors.genre?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Image URL
            </label>
            <Field
              {...register("thumbnailUrl")}
              type="text"
              name="thumbnailUrl"
            />
            <ErrorText err={errors.thumbnailUrl?.message} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Short Description
            </label>
            <Field
              {...register("shortDescription")}
              type="text"
              name="shortDescription"
            />
            <ErrorText err={errors.shortDescription?.message} />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Long Description
            </label>
            <FieldArea
              {...register("longDescription")}
              rows={3}
              name="longDescription"
            />
            <ErrorText err={errors.longDescription?.message} />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800">
              Price per day
            </label>
            <Field
              min={0}
              {...register("pricePerDay")}
              type="number"
              name="pricePerDay"
            />
            <ErrorText err={errors.pricePerDay?.message} />
          </div>
          <div className="mt-6">
            <CTA
              disabled={(!!id && !isDirty)}
              type={"submit"}>{id ? "Update" : "Submit"}</CTA>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ManageBookScreen;