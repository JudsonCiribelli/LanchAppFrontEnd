import { Button } from "@/_components/ui/button";
import { formatDate } from "@/_helpers/formatDate";
import { formatPhone } from "@/_helpers/formatPhone";
import { getInitials } from "@/_helpers/getInitials";
import { UserTypes } from "@/types/user";
import { Calendar, Edit3, Mail, Phone, ShieldCheck } from "lucide-react";

interface UserCardProps {
  user: UserTypes;
}

const UserCardComponent = ({ user }: UserCardProps) => {
  return (
    <section className="col-span-1 bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col items-center text-center h-fit">
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-slate-800">
          {getInitials(user.name)}
        </div>
        <Button className="absolute bottom-0 right-0 bg-slate-700 hover:bg-slate-600 p-2 rounded-full border-4 border-slate-900 transition-colors">
          <Edit3 size={22} className="text-white" />
        </Button>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
      {user.role === "ADMIN" && (
        <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 mb-6 inline-flex items-center gap-1">
          <ShieldCheck size={12} /> ADMIN
        </span>
      )}

      {/* DADOS DO USUARIO */}
      <div className="w-full space-y-4 text-left bg-slate-950/50 p-5 rounded-xl border border-slate-800">
        {/* EMAIL */}
        <div className="flex items-center gap-3 text-slate-400">
          <Mail size={18} className="text-blue-500" />
          <div className="overflow-hidden">
            <p className="text-sm text-slate-200 truncate" title={user.email}>
              {user.email}
            </p>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-3 text-slate-400">
          <Phone size={18} className="text-blue-500" />
          <div>
            <p className="text-sm text-slate-200">{formatPhone(user.phone)}</p>
          </div>
        </div>

        {/* MEMBRO */}
        <div className="flex items-center gap-3 text-slate-400">
          <Calendar size={18} className="text-blue-500" />
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">
              Membro Desde
            </p>
            <p className="text-sm text-slate-200">
              {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20">
        Editar Perfil
      </button>
    </section>
  );
};

export default UserCardComponent;
