export default interface ISerializable<T> {
    deserialize(data: Object): T;
}