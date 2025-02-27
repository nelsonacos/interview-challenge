import { useCategories } from "@/product";

interface FiltersPanelProps {
    selectedCategory: string | null;
    onFilterChange: (category: string | null) => void;
}

export const FiltersPanel = ({ selectedCategory, onFilterChange }: FiltersPanelProps) => {
    const { data: categories, isLoading, error } = useCategories();

    const handleFilter = (category: string | null) => {
        onFilterChange(category);
    };

    if (isLoading) return <p>Cargando categorías...</p>;
    if (error) return <p>Error al cargar categorías</p>;

    const categoryNames = categories?.map((category) => category.name) || [];

    return (
        <div>
            <h3>Filtrar por Categoría</h3>
            <select
                onChange={(e) => handleFilter(e.target.value || null)}
                value={selectedCategory || ""}
            >
                <option value="">Todas las Categorías</option>
                {categoryNames.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};