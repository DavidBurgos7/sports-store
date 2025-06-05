import { ChevronRight } from "lucide-react";
import Link from "next/link";


export default function Breadcrumb({ currentPage = "Actual"}) {

    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Inicio
                </Link>
            </li>
            <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="ml-1 text-sm font-medium text-foreground">
                    {currentPage}
                </span>
            </li>
            </ol>
        </nav>
    );
}
