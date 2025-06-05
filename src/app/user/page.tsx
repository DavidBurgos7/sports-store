import Breadcrumb from "@/components/common/breadcrumb";
import UserInfoForm from "@/components/users/user-info-form";


export default function UserInfo() {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                <Breadcrumb currentPage="Mi Perfil" />
                <UserInfoForm />
            </main>
        </div>
    );
}