import Swal from "sweetalert2";

export function showConfirmDialog(message, btnText) {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, ${btnText}`,
  });
}
