import Link from "next/link";

export type Crumbs = {
    label: string;
    path: string;
}
interface BreadcrumbProps {
    current_page: string;
    crumbs?: Crumbs[];
}
const Breadcrumb = ({ current_page, crumbs }: BreadcrumbProps) => {

    const generateCrumbs = () => {
        if(Array.isArray(crumbs)){
            return (crumbs.map((crumb, index)=> (
                <li key={index}>
                    <Link className="font-medium transition hover:text-primary" href={crumb.path}>{crumb.label}</Link> /
                </li>
            )))
        }
    };

    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {current_page && <h2 className="text-title-md2 font-semibold text-black dark:text-white">{current_page}</h2> }
            <nav>
                <ol className="flex items-center gap-2">
                    <li key="dashboard">
                        <Link className="font-medium transition hover:text-primary" href="/">Dashboard</Link> /
                    </li>
                    {generateCrumbs()}
                    {current_page && <li key="current" className="text-black dark:text-white font-bold">{current_page}</li> }

                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
