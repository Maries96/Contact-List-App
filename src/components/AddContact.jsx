import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export function AddContact() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const postContact = (payload) => {
    return supabaseClient.from('contacts').insert ({
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      user_id: user.id
    })
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: postContact,
    onSuccess: () => {
      // invalidate and refetch
      queryClient.invalidateQueries({ QueryKey: ["contacts"] });
      router.push("/");
    },
  });


  const handleSubmitForm = (data) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-group">
          <label for="inputFullName">Full Name</label>
          <input
            {...register("full_name", { required: true })}
            type="text"
            class="form-control"
            id="inputFullName"
            placeholder="John Doe"
          ></input>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPhone">Phone</label>
            <input
              {...register("phone", { required: true })}
              type="phone"
              class="form-control"
              id="inputPhone"
              placeholder="Phone"
            ></input>
          </div>
        </div>
        <div className="form-group">
          <label for="inputAddress">Address</label>
          <input
            {...register("address")}
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          ></input>
        </div>

        <div className="form-row"></div>
        <div className="form-group"></div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
        {isLoading ? "Saving Contact" : "Save Contact"}
      </form>
    </div>
  );
}
