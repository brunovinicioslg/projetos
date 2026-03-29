namespace LEITOR.Models
{
    public class ListaModel
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }
        public int? Quantidade { get; set; }
        public int Status {  get; set; }


        public int? UsuarioId { get; set; }
        public UsuarioModel Usuario { get; set; }

    }
}
